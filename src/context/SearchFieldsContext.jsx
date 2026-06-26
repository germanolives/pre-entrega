import { useState, useContext, createContext, useEffect } from "react";

export const SearchFieldsContext = createContext();

export const useSearchFields = () => {
  const context = useContext(SearchFieldsContext);
  if (!context) {
    throw new Error("useSearchFields debe ser usado dentro de un SearchFieldsProvider");
  }
  return context;
};

export const SearchFieldsProvider = ({ children }) => {
  const [searchFields, setSearchFields] = useState(() => {
    const localData = localStorage.getItem("searchFields");

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
      localStorage.removeItem("searchFields");
      return [
        { field: "code", active: true },
        { field: "title", active: false },
        { field: "description", active: false },
        { field: "category", active: false },
      ];
    }
  });

  useEffect(() => {
    localStorage.setItem("searchFields", JSON.stringify(searchFields));
  }, [searchFields]);

  const changeSearchField = (option) => {
    const newSearchField = searchFields.map((item) =>
      item.field === String(option)
        ? { ...item, active: true }
        : { ...item, active: false },
    );
    setSearchFields(newSearchField);
  };

  const selectedField = searchFields.find((item) => item.active === true);
  const excludedFields = ["description"];
  const unselectedFields = searchFields.filter(
    (item) => item.active === false && !excludedFields.includes(item.field),
  );

  return (
    <SearchFieldsContext.Provider
      value={{
        searchFields,
        selectedField,
        unselectedFields,
        changeSearchField,
      }}
    >
      {children}
    </SearchFieldsContext.Provider>
  );
};
