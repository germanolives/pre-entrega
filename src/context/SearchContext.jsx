import { useState, useContext, createContext, useEffect } from "react";

export const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch debe ser usado dentro de un SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState(() => {
    const localData = localStorage.getItem("search");

    if (!localData) {
      return [
        { field: "code", active: true },
        { field: "title", active: false },
        { field: "description", active: false },
        { field: "category", active: false },
      ];
    }

    try {
      return JSON.parse(localData);
    } catch (error) {
      console.warn(
        "Se detectó un almacenamiento de búsqueda corrupto. Limpiando...",
      );
      localStorage.removeItem("search");
      return [
        { field: "code", active: true },
        { field: "title", active: false },
        { field: "description", active: false },
        { field: "category", active: false },
      ];
    }
  });

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(search));
  }, [search]);

  const changeSearch = (option) => {
    const newSearch = search.map((item) =>
      item.field === String(option)
        ? { ...item, active: true }
        : { ...item, active: false },
    );
    setSearch(newSearch);
  };

  const selectedField = search.find((item) => item.active === true);
  const excludedFields = ["description"];
  const unselectedFields = search.filter(
    (item) => item.active === false && !excludedFields.includes(item.field),
  );

  return (
    <SearchContext.Provider
      value={{
        search,
        selectedField,
        unselectedFields,
        changeSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
