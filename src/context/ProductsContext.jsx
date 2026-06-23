import { useState, useEffect, useContext, createContext, useMemo } from "react";
import { useQuery } from "../hooks/useQuery";
import { db } from "../config/firebase";
import { doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";

export const ProductsContext = createContext();

export const useProducts = (
  categorySlug = null,
  titleSlug = null,
  id = null,
) => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductsProvider");
  }

  const { data: allData, loading, error, ...actions } = context;

  const filteredData = useMemo(() => {
    if (loading || error || !Array.isArray(allData)) return allData;

    if (categorySlug && titleSlug && id) {
      return allData.find((item) => item.id === id) || null;
    }

    if (categorySlug) {
      return allData.filter((item) => item.categorySlug === categorySlug);
    }

    return allData;
  }, [allData, loading, error, categorySlug, titleSlug, id]);

  if (loading || error) return context;

  return {
    loading,
    error,
    data: filteredData,
    ...actions,
  };
};

export const ProductsProvider = ({ children }) => {
  const { data: products, loading, error, refetch } = useQuery();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!loading && !error && Array.isArray(products)) {
      setData(products);
    }
  }, [products, loading, error]);

  // 🚀 Métodos ABM lineales apuntando directo a Firestore sin condicionales de origen
  const updateProduct = async (item) => {
    try {
      const productRef = doc(db, "products", item.id);
      await updateDoc(productRef, item);

      setData((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id === item.id ? { ...prod, ...item } : prod,
        ),
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

  const getProductsQuantity = () => {
    return data.length;
  };

  const getTotalStock = () => {
    return data.reduce((acc, item) => acc + Number(item.stock), 0);
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
        getProductsQuantity,
        getTotalStock,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

