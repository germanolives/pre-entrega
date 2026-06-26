import { useState, useEffect, useContext, createContext, useMemo } from "react";
import { useQueryFull } from "../hooks/useQueryFull";
import { db } from "../config/firebase";
import { doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";

export const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error(
      "useInventory debe ser usado dentro de un InventoryProvider",
    );
  }

  const { data: allData, loading, error, ...actions } = context;

  const filteredData = useMemo(() => {
    if (loading || error || !Array.isArray(allData)) return allData;
    return allData;
  }, [allData, loading, error]);

  if (loading || error) return context;

  return {
    loading,
    error,
    data: filteredData,
    ...actions,
  };
};

export const InventoryProvider = ({ children }) => {
  const { data: products, loading, error, refetch } = useQueryFull();
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
    <InventoryContext.Provider
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
    </InventoryContext.Provider>
  );
};
