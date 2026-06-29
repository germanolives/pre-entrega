import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const useQueryFull = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔒 1. Centralizamos la descarga en una función única y limpia
  // Usamos useCallback para que la función no se recree en cada render
  const fetchProducts = useCallback(async () => {
    const referenceDocs = collection(db, "products");
    const snapDocs = await getDocs(referenceDocs);
    
    if (snapDocs.empty) {
      throw new Error("Los documentos solicitados no existen en la base de datos.");
    }

    return snapDocs.docs.map((document) => ({
      ...document.data(),
      id: document.id,
    }));
  }, []);

  // 🔄 2. Carga inicial automatizada al montar el componente
  useEffect(() => {
    let isMounted = true; // Evita fugas de memoria si el componente se desmonta a mitad del viaje de red
    
    const initLoad = async () => {
      setLoading(true);
      setError(null);
      try {
        const products = await fetchProducts();
        if (isMounted) setData(products);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initLoad();
    return () => { isMounted = false; };
  }, [fetchProducts]);

  // ⚡ 3. El refetch manual: Limpio, asíncrono y sin duplicar código
  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await fetchProducts();
      setData(products);
      return products; // Devolvemos la data directo al invocador
    } catch (err) {
      setError(err.message);
      return []; // Salvaguarda si falla la red
    } finally {
      setLoading(false); // El único y definitivo apagador del spinner
    }
  };

  return { data, loading, error, refetch };
};

























// import { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../config/firebase";

// export const useQueryFull = () => {
//   const [data, setData] = useState();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reload, setReload] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     const getData = async () => {
//       try {
//         const referenceDocs = collection(db, "products");
//         const snapDocs = await getDocs(referenceDocs);
//         if (snapDocs.empty) {
//           throw new Error(
//             "Los documentos solicitados no existen en la base de datos.",
//           );
//         } else {
//           const products = snapDocs.docs.map((document) => ({
//             ...document.data(),
//             id: document.id,
//           }));
//           setData(products);
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getData();
//   }, [reload]);

//   const refetch = () => {
//     setReload((prev) => !prev);
//   };

//   return { data, loading, error, refetch };
// };
