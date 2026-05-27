import { useState, useContext, createContext, useEffect } from "react";
import { CartItem } from "../components/Cart/CartItem";
import { idGenerator } from "../utils/idGenerator";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    const itemInCart = cart.find((item) => item.id === product.id);
    if (itemInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity:
                item.quantity + quantity > 0 ? item.quantity + quantity : 1,
            }
          : item,
      );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity }]);
    }
  };

  const clearCart = (product = null) => {
    if (product) {
      const searchProd = cart.find((item) => item.id === product.id);
      const newCart = searchProd
        ? cart.filter((item) => item.id != searchProd.id)
        : cart;
      setCart(newCart);
    } else {
      setCart([]);
    }
  };

  const resetProdQtyCart = (product) => {
    if (!product) return;
    const newCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: 1 } : item,
    );
    setCart(newCart);
  };

  const getCartQuantity = (product = null) => {
    if (product) {
      const searchProd = cart.find((item) => item.id === product.id);
      return searchProd ? searchProd.quantity : 0;
    } else {
      return cart.reduce((acc, item) => acc + item.quantity, 0);
    }
  };

  const getCartTotal = (product = null) => {
    if (product) {
      const searchProd = cart.find((item) => item.id === product.id);
      if (searchProd) {
        const appliedOffers = searchProd.offers.find(
          (o) => searchProd.quantity >= o.qty,
        );
        const discount = appliedOffers ? appliedOffers.discount : 0;
        const finalPrice =
          searchProd.price - (discount / 100) * searchProd.price;
        return searchProd.quantity * finalPrice;
      } else {
        return 0;
      }
    } else {
      return cart.reduce((acc, item) => {
        const appliedOffers = item.offers.find((o) => item.quantity >= o.qty);
        const discount = appliedOffers ? appliedOffers.discount : 0;
        const finalPrice = item.price - (discount / 100) * item.price;
        return acc + item.quantity * finalPrice;
      }, 0);
    }
  };

  // const checkCart = (data) => {
  //   const cartId = idGenerator();
  //   const newCart = cart.filter(
  //     (cartItem) =>
  //       cartItem.id ===
  //       data.find(
  //         (dataItem) => dataItem.id === cartItem.id && dataItem.stock > 0,
  //       )?.id,
  //   );
  //   const updatedNewCart = newCart.map((item) => {
  //     const findedItem = data.find((dataItem) => dataItem.id === item.id);
  //     if (findedItem) {
  //       return {
  //         ...item,
  //         cartId,
  //         price: findedItem.price,
  //         quantity:
  //           item.quantity > findedItem.stock ? findedItem.stock : item.quantity,
  //         offers: findedItem.offers,
  //         stock: findedItem.stock,
  //       };
  //     }
  //     return item;
  //   });
  //   setCart(updatedNewCart);
  // };

  const checkCart = (data) => {
    const newCart = cart.filter(
      (cartItem) =>
        cartItem.id ===
        data.find(
          (dataItem) => dataItem.id === cartItem.id && dataItem.stock > 0,
        )?.id,
    );
    const updatedNewCart = newCart.map((item) => {
      const findedItem = data.find((dataItem) => dataItem.id === item.id);
      if (findedItem) {
        return {
          ...item,
          price: findedItem.price,
          quantity:
            item.quantity > findedItem.stock ? findedItem.stock : item.quantity,
          offers: findedItem.offers,
          stock: findedItem.stock,
        };
      }
      return item;
    });
    setCart(updatedNewCart);
  };

  const isItemInCart = (product) => {
    if (!product) return false;
    const searchProduct = cart.find((item) => item.id === product.id);
    return searchProduct ? true : false;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
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
