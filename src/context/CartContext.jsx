import { useState, useContext, createContext } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    const itemInCart = cart.find((item) => item.id === product.id);
    if (itemInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
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
        const appliedOffer = searchProd.offer.find(
          (o) => searchProd.quantity >= o.qty,
        );
        const discount = appliedOffer ? appliedOffer.discount : 0;
        const finalPrice =
          searchProd.price - (discount / 100) * searchProd.price;
        return searchProd.quantity * finalPrice;
      } else {
        return 0;
      }
    } else {
      return cart.reduce((acc, item) => {
        const appliedOffer = item.offer.find((o) => item.quantity >= o.qty);
        const discount = appliedOffer ? appliedOffer.discount : 0;
        const finalPrice = item.price - (discount / 100) * item.price;
        return acc + item.quantity * finalPrice;
      }, 0);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, getCartQuantity, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
