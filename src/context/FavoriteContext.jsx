import { useState, useContext, createContext, useEffect } from "react";

export const FavoriteContext = createContext();

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite debe ser usado dentro de un FavoriteProvider");
  }
  return context;
};

export const FavoriteProvider = ({ children }) => {
  const [favorite, setFavorite] = useState(() => {
    const localData = localStorage.getItem("favorite");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  const toggleFavorite = (product) => {
    setFavorite((prev) => {
      const itemInFavorite = prev.find((item) => item.id === product.id);
      if (itemInFavorite) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, { ...product }];
      }
    });
  };

  const isFavorite = (product) => {
    if (!product) return false;
    const searchProduct = favorite.find((item) => item.id === product.id);
    return searchProduct ? true : false;
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorite,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
