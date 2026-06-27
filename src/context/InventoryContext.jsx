import { useState, useEffect, createContext, useContext, useMemo } from "react";
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

  // 🔒 Última línea de defensa: Sanitiza y fuerza tipos puros antes de escribir en la DB
  const sanitizeProduct = (item) => {
    return {
      ...item,
      price: item.price !== undefined ? Number(item.price) : 0,
      stock: item.stock !== undefined ? Number(item.stock) : 0,
      rating: {
        rate: item.rating?.rate !== undefined ? Number(item.rating.rate) : 0,
        count: item.rating?.count !== undefined ? Number(item.rating.count) : 0,
      },
    };
  };

  const updateProduct = async (item) => {
    try {
      // 🚀 Sanitizamos el payload antes de enviarlo a Firestore
      const sanitizedItem = sanitizeProduct(item);
      const productRef = doc(db, "products", sanitizedItem.id);
      
      await updateDoc(productRef, sanitizedItem);

      setData((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id === sanitizedItem.id ? { ...prod, ...sanitizedItem } : prod,
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
      // 🚀 Sanitizamos el payload para asegurar alta limpia en la DB
      const sanitizedItem = sanitizeProduct(item);
      const productRef = doc(db, "products", sanitizedItem.id);
      
      await setDoc(productRef, sanitizedItem);

      setData((prevProducts) => [...prevProducts, sanitizedItem]);
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
    return data.reduce((acc, item) => acc + Number(item.stock || 0), 0);
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