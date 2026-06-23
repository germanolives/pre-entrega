import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const useQuery = (categorySlug = null, titleSlug = null, id = null) => {
  const [data, setData] = useState(
    categorySlug && titleSlug && id ? null : categorySlug ? [] : [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const getData = async () => {
      // Caso A: Búsqueda de un repuesto específico por ID (Detalle del producto)
      if (categorySlug && titleSlug && id) {
        try {
          const referenceDoc = doc(db, "products", id);
          const snapDoc = await getDoc(referenceDoc);
          if (!snapDoc.exists()) {
            throw new Error(
              "El documento solicitado no existe en la base de datos.",
            );
          } else {
            const product = { ...snapDoc.data(), id: snapDoc.id };
            setData(product);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
      // Caso B: Filtrado de catálogo por categoría (Filtros de navegación)
      else if (categorySlug && titleSlug == null && id == null) {
        try {
          const referenceDocs = collection(db, "products");
          const categoryQuery = query(
            referenceDocs,
            where("categorySlug", "==", categorySlug),
          );
          const snapDocs = await getDocs(categoryQuery);
          if (snapDocs.empty) {
            throw new Error(
              "Los documentos solicitados no existen en la base de datos.",
            );
          } else {
            const category = snapDocs.docs.map((document) => ({
              ...document.data(),
              id: document.id,
            }));
            setData(category);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
      // Caso C: Retorna el catálogo completo original
      else {
        try {
          const referenceDocs = collection(db, "products");
          const snapDocs = await getDocs(referenceDocs);
          if (snapDocs.empty) {
            throw new Error(
              "Los documentos solicitados no existen en la base de datos.",
            );
          } else {
            const products = snapDocs.docs.map((document) => ({
              ...document.data(),
              id: document.id,
            }));
            setData(products);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    getData();
  }, [categorySlug, titleSlug, id, reload]); // 🚀 Removido 'source' de las dependencias

  const refetch = () => {
    setReload((prev) => !prev);
  };

  return { data, loading, error, refetch };
};
