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
      return searchProd ? searchProd.quantity * searchProd.price : 0;
    } else {
      return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
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







// const getCartTotal = (product = null) => {
//     if (product) {
//       const searchProd = cart.find((item) => item.id === product.id);
//       return searchProd ? searchProd.quantity * searchProd.price : 0;
//     } else {
//       return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     }
//   };



//   const sortedOffers = [...offer].sort((a, b) => b.qty - a.qty);
//   const appliedOffer = sortedOffers.find((o) => count >= o.qty);
//   const discount = appliedOffer ? appliedOffer.discount : 0;