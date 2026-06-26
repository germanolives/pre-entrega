import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const useQueryFull = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const getData = async () => {
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
    };
    getData();
  }, [reload]);

  const refetch = () => {
    setReload((prev) => !prev);
  };

  return { data, loading, error, refetch };
};
