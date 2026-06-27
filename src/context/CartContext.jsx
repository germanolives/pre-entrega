import { useState, useEffect, createContext, useContext, useMemo } from "react";
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

  // 🔒 1. Sanitización estricta al leer del almacenamiento local
  useEffect(() => {
    if (!currentUser) return;

    const localData = localStorage.getItem(userCart);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        const sanitized = parsed.map((item) => ({
          ...item,
          quantity: Number(item.quantity || 0),
          price: Number(item.price || 0),
          stock: Number(item.stock || 0) // 🚀 Aseguramos también el stock en memoria local
        }));
        setCart(sanitized);
      } catch (e) {
        setCart([]);
      }
    } else {
      setCart([]); 
    }
  }, [userCart, currentUser]);

  // Sincronización con almacenamiento local
  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem(userCart, JSON.stringify(cart));
  }, [userCart, cart, currentUser]);

  // 🔒 2. Aritmética y control de inventario blindados al agregar
  const addToCart = (product, quantity) => {
    if (!product || !product.id || !quantity || quantity <= 0 || !currentUser)
      return;

    const numInputQty = Number(quantity); // 🚀 Forzamos Number al input entrante

    setCart((prevCart) => {
      const itemInCart = prevCart.find(
        (item) => String(item.id) === String(product.id),
      );
      
      // 🔒 Aseguramos que el stock de control sea puramente numérico
      const maxStock = product.stock !== undefined ? Number(product.stock) : 999; 

      if (itemInCart) {
        const potentialQuantity = Number(itemInCart.quantity) + numInputQty; // 🚀 Suma matemática garantizada (Evita el "1" + 1 = "11")
        const finalQuantity = potentialQuantity > maxStock ? maxStock : potentialQuantity;

        return prevCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: finalQuantity, stock: maxStock }
            : item,
        );
      }

      const initialQuantity = numInputQty > maxStock ? maxStock : numInputQty;
      return [...prevCart, { ...product, quantity: initialQuantity, price: Number(product.price), stock: maxStock }];
    });
  };

  // 🔒 3. Control estricto de tipos en la actualización manual de cantidades
  const updateCartQuantity = (product, newQuantity) => {
    if (!product || !product.id || !currentUser) return;

    const numNewQty = Number(newQuantity);
    const numStock = Number(product.stock !== undefined ? product.stock : 999);

    setCart((prevCart) => {
      if (numNewQty <= 0) {
        return prevCart.filter(
          (item) => String(item.id) !== String(product.id),
        );
      }

      // 🔒 Comparación de cotas numéricas reales
      const finalQuantity = numNewQty > numStock ? numStock : numNewQty;

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
      setCart((prevCart) => prevCart.filter((item) => String(item.id) !== String(product.id)));
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

  const getCartTotal = (product = null) => {
    if (!currentUser) return 0;
    if (product) {
      const searchProd = cart.find(
        (item) => String(item.id) === String(product.id),
      );
      if (searchProd) {
        // 🔒 Aseguramos tipos numéricos en la resolución de ofertas del producto individual
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
        // 🔒 Aseguramos tipos numéricos en el acumulador general
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

  // 🔒 4. Sincronización y normalización de tipos numéricos contra la DB fresca
  const checkCart = (data) => {
    if (!data || !currentUser) return;
    const newCart = cart.filter((cartItem) => {
      const matchingDataItem = data.find(
        (dataItem) =>
          String(dataItem.id) === String(cartItem.id) && Number(dataItem.stock) > 0,
      );
      return matchingDataItem !== undefined;
    });

    const updatedNewCart = newCart.map((item) => {
      const findedItem = data.find(
        (dataItem) => String(dataItem.id) === String(item.id),
      );
      if (findedItem) {
        const freshStock = Number(findedItem.stock || 0);
        const currentQty = Number(item.quantity || 0);

        return {
          ...item,
          price: Number(findedItem.price || 0), // 🚀 Normalizamos a número
          quantity: currentQty > freshStock ? freshStock : currentQty, // 🚀 Comparación numérica real
          offers: findedItem.offers || [],
          stock: freshStock,
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

  const idListCart = useMemo(() => {
    if (!cart) return [];
    return cart.map((item) => String(item.id));
  }, [cart]);


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
        idListCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};