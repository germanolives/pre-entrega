import { useState, useEffect, createContext, useContext } from "react";

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
    const itemInCart = cart.find((item) => String(item.id) === String(product.id));
    if (itemInCart) {
      const updatedCart = cart.map((item) =>
        String(item.id) === String(product.id)
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
      setCart(cart.filter((item) => String(item.id) !== String(product.id)));
    } else {
      setCart([]);
    }
  };

  const resetProdQtyCart = (product) => {
    if (!product) return;
    const newCart = cart.map((item) =>
      String(item.id) === String(product.id) ? { ...item, quantity: 1 } : item,
    );
    setCart(newCart);
  };

  const getCartQuantity = (product = null) => {
    if (product) {
      const searchProd = cart.find((item) => String(item.id) === String(product.id));
      return searchProd ? searchProd.quantity : 0;
    } else {
      return cart.reduce((acc, item) => acc + item.quantity, 0);
    }
  };

  const getCartTotal = (product = null) => {
    if (product) {
      const searchProd = cart.find((item) => String(item.id) === String(product.id));
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

  const checkCart = (data) => {
    const newCart = cart.filter((cartItem) => {
      const matchingDataItem = data.find(
        (dataItem) => String(dataItem.id) === String(cartItem.id) && dataItem.stock > 0,
      );
      return matchingDataItem !== undefined;
    });

    const updatedNewCart = newCart.map((item) => {
      const findedItem = data.find((dataItem) => String(dataItem.id) === String(item.id));
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
    const searchProduct = cart.find((item) => String(item.id) === String(product.id));
    return searchProduct ? true : false;
  };

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