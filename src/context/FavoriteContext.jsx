import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

export const FavoriteContext = createContext();

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite debe ser usado dentro de un FavoriteProvider");
  }
  return context;
};

export const FavoriteProvider = ({ children }) => {
  const { user } = useAuth();
  const currentUser = user ? user.uid : null;
  const userFavorites = `favorite.${currentUser}`;
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const localData = localStorage.getItem(userFavorites);
    setFavorite(localData ? JSON.parse(localData) : []);
  }, [userFavorites]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(userFavorites, JSON.stringify(favorite));
    }
  }, [favorite, userFavorites]);

  const toggleFavorite = (product) => {
    if (!product.id || !currentUser) return;

    setFavorite((prev) => {
      const itemInFavorite = prev.find((item) => {
        if (!item.id) return false;
        return String(item.id) === String(product.id);
      });

      if (itemInFavorite) {
        return prev.filter(
          (item) => item.id && String(item.id) !== String(product.id),
        );
      } else {
        return [...prev, { ...product }];
      }
    });
  };

  const isFavorite = (product) => {
    if (!product || !product.id) return false;
    return favorite.some(
      (item) => item.id && String(item.id) === String(product.id),
    );
  };

  const getFavoriteQuantity = () => {
    return favorite ? favorite.length : 0;
  };

  const checkFavorite = (data) => {
    const newFavorite = favorite.filter((favoriteItem) => {
      const matchingDataItem = data.find(
        (dataItem) => String(dataItem.id) === String(favoriteItem.id),
      );
      return matchingDataItem !== undefined;
    });

    const updatedNewFavorite = newFavorite.map((item) => {
      const findedItem = data.find(
        (dataItem) => String(dataItem.id) === String(item.id),
      );
      if (findedItem) {
        return {
          ...item,
          price: findedItem.price,
          offers: findedItem.offers,
          stock: findedItem.stock,
        };
      }
      return item;
    });
    setFavorite(updatedNewFavorite);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorite,
        toggleFavorite,
        isFavorite,
        getFavoriteQuantity,
        checkFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
