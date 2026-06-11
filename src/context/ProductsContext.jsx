import { useState, useEffect, useContext, createContext, useMemo } from "react";
import { useQuery } from "../hooks/useQuery";
import { db } from "../config/firebase";
import { doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useSource } from "../context/SourceContext";

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

  // 🌟 useMemo blinda las operaciones de filtrado evitando re-renders infinitos en la UI
  const filteredData = useMemo(() => {
    if (loading || error || !Array.isArray(allData)) return allData;

    // Caso A: Búsqueda de un repuesto específico por ID (Detalle del producto)
    if (categorySlug && titleSlug && id) {
      return allData.find((item) => item.id === id) || null;
    }

    // Caso B: Filtrado de catálogo por categoría (Filtros de navegación)
    if (categorySlug) {
      return allData.filter((item) => item.categorySlug === categorySlug);
    }

    // Caso C: Retorna el catálogo completo
    return allData;
  }, [allData, loading, error, categorySlug, titleSlug, id]);

  // Si está cargando o da error, retorna el estado base del contexto sin romper la app
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
  const { nameSource } = useSource();

  useEffect(() => {
    if (!loading && !error && Array.isArray(products)) {
      setData(products);
    }
  }, [products, loading, error]);

  const updateProduct = async (item) => {
    if (nameSource !== "db") {
      console.warn("Modo local: Modificando producto en memoria.");
      setData((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id === item.id ? { ...prod, ...item } : prod,
        ),
      );
      return { success: true, local: true };
    }

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
    if (nameSource !== "db") {
      console.warn("Modo local: Insertando producto en memoria.");
      setData((prevProducts) => [...prevProducts, item]);
      return { success: true, local: true };
    }

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
    if (nameSource !== "db") {
      console.warn("Modo local: Eliminando producto en memoria.");
      setData((prevProducts) => prevProducts.filter((prod) => prod.id !== id));
      return { success: true, local: true };
    }

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
