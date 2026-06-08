import { useState, useEffect, useContext, createContext } from "react";
import { useQuery } from "../hooks/useQuery";
import { db } from "../config/firebase";
import { doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";

export const ProductsContext = createContext();

export const useProducts = (categorySlug = null, titleSlug = null, id = null) => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductsProvider");
  }

  const { data, loading, error, refetch, updateProduct, addProduct, deleteProduct } = context;
  if (loading || error) return context;

  if (categorySlug && titleSlug && id) {
    const product = data.find((item) => item.id === id) || null;
    return { loading, error, data: product, refetch, updateProduct, addProduct, deleteProduct };
  }

  if (categorySlug) {
    const category = data.filter((item) => item.categorySlug === categorySlug);
    return { loading, error, data: category, refetch, updateProduct, addProduct, deleteProduct };
  }

  return context;
};

export const ProductsProvider = ({ children }) => {
  const { data: products, loading, error, refetch } = useQuery();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!loading && !error && Array.isArray(products)) {
      setData(products);
    }
  }, [products, loading, error]);

  const updateProduct = async (item) => {
    try {
      const productRef = doc(db, "products", item.id);
      await updateDoc(productRef, item);

      setData((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id === item.id ? { ...prod, ...item } : prod
        )
      );

      return { success: true };
    } catch (err) {
      console.error("Error crítico al actualizar en Firestore:", err);
      return { success: false, error: err };
    }
  };

  const addProduct = async (item) => {
    try {
      const productRef = doc(db, "products", item.id);
      await setDoc(productRef, item);

      setData((prevProducts) => [...prevProducts, item]);

      return { success: true };
    } catch (err) {
      console.error("Error crítico al agregar en Firestore:", err);
      return { success: false, error: err };
    }
  };

  const deleteProduct = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);

      setData((prevProducts) => prevProducts.filter((prod) => prod.id !== id));

      return { success: true };
    } catch (err) {
      console.error("Error crítico al eliminar en Firestore:", err);
      return { success: false, error: err };
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        data,
        loading,
        error,
        refetch,
        updateProduct,
        addProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};