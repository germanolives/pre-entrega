import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const currentUser = user ? user.uid : null;
  const userCart = `cart.${currentUser}`;
  const [cart, setCart] = useState([]);

  // 🌟 1. Corregido: Bloqueamos la lectura si Firebase aún no resolvió el usuario
  useEffect(() => {
    if (!currentUser) return;

    const localData = localStorage.getItem(userCart);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        const sanitized = parsed.map((item) => ({
          ...item,
          quantity: Number(item.quantity),
          price: Number(item.price),
        }));
        setCart(sanitized);
      } catch (e) {
        setCart([]);
      }
    } else {
      setCart([]); // Si el usuario no tiene carrito previo, lo limpiamos del estado del usuario anterior
    }
  }, [userCart, currentUser]);

  // 🌟 1. Corregido: Bloqueamos la escritura si no hay un usuario real logueado
  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem(userCart, JSON.stringify(cart));
  }, [userCart, cart, currentUser]);

  const addToCart = (product, quantity) => {
    if (!product || !product.id || !quantity || quantity <= 0 || !currentUser)
      return;

    setCart((prevCart) => {
      const itemInCart = prevCart.find(
        (item) => String(item.id) === String(product.id),
      );
      const maxStock = product.stock !== undefined ? product.stock : 999; // Fallback por seguridad

      if (itemInCart) {
        const potentialQuantity = itemInCart.quantity + quantity;
        const finalQuantity =
          potentialQuantity > maxStock ? maxStock : potentialQuantity;

        return prevCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: finalQuantity }
            : item,
        );
      }

      const initialQuantity = quantity > maxStock ? maxStock : quantity;
      return [...prevCart, { ...product, quantity: initialQuantity }];
    });
  };

  const updateCartQuantity = (product, newQuantity) => {
    if (!product || !product.id || !currentUser) return;

    setCart((prevCart) => {
      // Si la cantidad es 0 o menos, removemos el ítem por completo
      if (newQuantity <= 0) {
        return prevCart.filter(
          (item) => String(item.id) !== String(product.id),
        );
      }

      // Controlamos que no supere el stock
      const finalQuantity =
        newQuantity > product.stock ? product.stock : newQuantity;

      return prevCart.map((item) =>
        String(item.id) === String(product.id)
          ? { ...item, quantity: finalQuantity }
          : item,
      );
    });
  };

  const clearCart = (product = null) => {
    if (!currentUser) return;
    if (product) {
      setCart(cart.filter((item) => String(item.id) !== String(product.id)));
    } else {
      setCart([]);
    }
  };

  const resetProdQtyCart = (product) => {
    if (!product || !currentUser) return;
    const newCart = cart.map((item) =>
      String(item.id) === String(product.id) ? { ...item, quantity: 1 } : item,
    );
    setCart(newCart);
  };

  const getCartQuantity = (product = null) => {
    if (product) {
      const searchProd = cart.find(
        (item) => String(item.id) === String(product.id),
      );
      return searchProd ? Number(searchProd.quantity) : 0;
    } else {
      return cart.reduce((acc, item) => acc + Number(item.quantity), 0);
    }
  };

  // 🌟 3. Optimizado: Agregado Optional Chaining (?.) para evitar que explote si un producto no tiene ofertas cargadas
  const getCartTotal = (product = null) => {
    if (!currentUser) return 0;
    if (product) {
      const searchProd = cart.find(
        (item) => String(item.id) === String(product.id),
      );
      if (searchProd) {
        const appliedOffers =
          searchProd.offers?.find(
            (o) => Number(searchProd.quantity) >= Number(o.qty),
          ) || null;
        const discount = appliedOffers ? Number(appliedOffers.discount) : 0;
        const finalPrice =
          Number(searchProd.price) -
          (discount / 100) * Number(searchProd.price);
        return Number(searchProd.quantity) * finalPrice;
      } else {
        return 0;
      }
    } else {
      return cart.reduce((acc, item) => {
        const appliedOffers =
          item.offers?.find((o) => Number(item.quantity) >= Number(o.qty)) ||
          null;
        const discount = appliedOffers ? Number(appliedOffers.discount) : 0;
        const finalPrice =
          Number(item.price) - (discount / 100) * Number(item.price);
        return acc + Number(item.quantity) * finalPrice;
      }, 0);
    }
  };

  const checkCart = (data) => {
    if (!data || !currentUser) return;
    const newCart = cart.filter((cartItem) => {
      const matchingDataItem = data.find(
        (dataItem) =>
          String(dataItem.id) === String(cartItem.id) && dataItem.stock > 0,
      );
      return matchingDataItem !== undefined;
    });

    const updatedNewCart = newCart.map((item) => {
      const findedItem = data.find(
        (dataItem) => String(dataItem.id) === String(item.id),
      );
      if (findedItem) {
        return {
          ...item,
          price: findedItem.price,
          quantity:
            item.quantity > findedItem.stock ? findedItem.stock : item.quantity,
          offers: findedItem.offers || [],
          stock: findedItem.stock,
        };
      }
      return item;
    });
    setCart(updatedNewCart);
  };

  const isItemInCart = (product) => {
    if (!currentUser) return false;
    if (!product) return false;
    const searchProduct = cart.find(
      (item) => String(item.id) === String(product.id),
    );
    return searchProduct ? true : false;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartQuantity,
        clearCart,
        getCartQuantity,
        getCartTotal,
        checkCart,
        resetProdQtyCart,
        isItemInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
