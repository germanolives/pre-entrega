// src/context/SearchMatchesContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const SearchMatchesContext = createContext();

export const useSearchMatches = () => {
  const context = useContext(SearchMatchesContext);
  if (!context) {
    throw new Error("useSearchMatches debe ser usado dentro de un SearchMatchesProvider");
  }
  return context;
};

export const SearchMatchesProvider = ({ children }) => {
  // 🚀 1. Leemos del almacenamiento de sesión
  const [searchList, setSearchList] = useState(() => {
    const savedMatches = sessionStorage.getItem("tienda_sau_last_search");
    return savedMatches ? JSON.parse(savedMatches) : [];
  });

  // 🚀 2. Sincronizamos con el almacenamiento de sesión
  useEffect(() => {
    sessionStorage.setItem("tienda_sau_last_search", JSON.stringify(searchList));
  }, [searchList]);

  return (
    <SearchMatchesContext.Provider value={{ searchList, setSearchList }}>
      {children}
    </SearchMatchesContext.Provider>
  );
};