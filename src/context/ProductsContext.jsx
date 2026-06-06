import { useContext, createContext } from "react";
import { useQuery } from "../hooks/useQuery";

export const ProductsContext = createContext();

export const useProducts = (categorySlug = null, titleSlug = null, id = null) => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductsProvider");
  }

  const { data, loading, error, refetch } = context;
  if (loading || error) return context;

  if (categorySlug && titleSlug && id) {
    const product = data.find((item) => item.id === id) || null;
    return { loading, error, data: product, refetch };
  }

  if (categorySlug) {
    const category = data.filter((item) => item.categorySlug === categorySlug);
    return { loading, error, data: category, refetch };
  }

  return context;
};

export const ProductsProvider = ({ children }) => {
  const { data: products, loading, error, refetch } = useQuery();

  const data = !loading && !error && Array.isArray(products) ? products : [];

  return (
    <ProductsContext.Provider
      value={{
        data,
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
