import { useState, useContext, createContext, useEffect } from "react";

export const SourceContext = createContext();

export const useSource = () => {
  const context = useContext(SourceContext);
  if (!context) {
    throw new Error("useSource debe ser usado dentro de un SourceProvider");
  }
  return context;
};

export const SourceProvider = ({ children }) => {
  const [source, setSource] = useState(() => {
    let localData = localStorage.getItem("source");
    if (!localData || localData === "local" || !navigator.onLine) {
      localData = "local";
    }
    return localData;
  });

  useEffect(() => {
    localStorage.setItem("source", source);
  }, [source]);

  const changeSource = (newSource) => {
    if (!navigator.onLine && newSource != "local") {
      return;
    }
    setSource(newSource);
  };

  const nameSource = () => {
    return source.toUpperCase();
  };

  return (
    <SourceContext.Provider
      value={{
        source,
        nameSource,
        changeSource,
      }}
    >
      {children}
    </SourceContext.Provider>
  );
};
