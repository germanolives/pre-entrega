import { useState, useEffect, useCallback, useRef } from "react";
import {
  collection,
  getDocs,
  getDoc,
  getCountFromServer,
  query,
  where,
  doc,
  limit,
  orderBy,
  startAt,
  documentId,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const useQuery = (
  categorySlug = null,
  titleSlug = null,
  id = null,
  idList = null,
  currentPage = 1,
  LIMIT_SIZE_TOTAL = 5,
  LIMIT_SIZE_CATEGORIES = 5,
) => {
  const [data, setData] = useState(categorySlug && titleSlug && id ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔒 PRIORIDAD 1: Reemplazamos el estado por un useRef para evitar re-fetches y renders en bucle
  const pageCursorsRef = useRef({}); 
  const [totalPages, setTotalPages] = useState(1);
  const [hasMoreServer, setHasMoreServer] = useState(true);

  const currentLimit = categorySlug ? LIMIT_SIZE_CATEGORIES : LIMIT_SIZE_TOTAL;
  const idListString = idList ? JSON.stringify(idList) : "";

  // 🔒 2. Calcular totalPages REALES desde el servidor
  useEffect(() => {
    if ((categorySlug && titleSlug && id) || idListString) return;

    const getTotalCount = async () => {
      try {
        const referenceDocs = collection(db, "products");
        let q = query(referenceDocs);

        if (categorySlug) {
          q = query(referenceDocs, where("categorySlug", "==", categorySlug));
        }

        const snapshot = await getCountFromServer(q);
        const totalDocuments = snapshot.data().count;
        const calculatedTotalPages = Math.ceil(totalDocuments / currentLimit) || 1;

        setTotalPages(calculatedTotalPages);
      } catch (err) {
        console.error("Error al counting documentos de paginación:", err);
      }
    };

    getTotalCount();
  }, [categorySlug, currentLimit, id, titleSlug, idListString]);

  // 🔒 3. EFECTO CORRECTOR: Vaciar el diccionario de cursores de forma síncrona al mutar filtro/categoría
  useEffect(() => {
    pageCursorsRef.current = {}; 
    setHasMoreServer(true);
  }, [categorySlug, currentLimit]);

  // 🔄 4. Efecto principal: Traer los documentos (Ahora 100% libre de loops por cursores)
  useEffect(() => {
    setLoading(true);
    setError(null);

    const getData = async () => {
      // Caso listado por ID (Carrito / Favoritos masivo)
      if (idListString) {
        const parsedIds = JSON.parse(idListString);
        if (parsedIds.length === 0) {
          setData([]);
          setLoading(false);
          return;
        }

        try {
          const referenceDocs = collection(db, "products");
          const q = query(referenceDocs, where(documentId(), "in", parsedIds));
          const snapDocs = await getDocs(q);

          const products = snapDocs.docs.map((document) => ({
            ...document.data(),
            id: document.id,
          }));

          setData(products);
          setHasMoreServer(false);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } 
      
      // Caso A: Detalle de producto único por ID
      else if (categorySlug && titleSlug && id) {
        try {
          const referenceDoc = doc(db, "products", id);
          const snapDoc = await getDoc(referenceDoc);
          if (!snapDoc.exists()) {
            throw new Error("El documento solicitado no existe.");
          } else {
            setData({ ...snapDoc.data(), id: snapDoc.id });
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }

      // Caso B y C unificados: Catálogo paginado por Servidor (Home y Categorías)
      else {
        try {
          // 🚨 CONTROL CRÍTICO DE URL MANUAL: 
          // Si van a pág > 1 pero el cursor no existe, cortamos de inmediato. 
          // La vista se encargará de interceptar esto y resetear la URL de forma síncrona.
          if (currentPage > 1 && !pageCursorsRef.current[currentPage]) {
            setData([]); 
            setHasMoreServer(false);
            setLoading(false);
            return;
          }

          const referenceDocs = collection(db, "products");
          let constraints = [orderBy("code")];

          if (categorySlug) {
            constraints.push(where("categorySlug", "==", categorySlug));
          }

          // Leemos directamente del objeto mutable .current sin registrar dependencias reactivas
          if (currentPage > 1 && pageCursorsRef.current[currentPage]) {
            constraints.push(startAt(pageCursorsRef.current[currentPage]));
          }

          constraints.push(limit(currentLimit + 1));

          const pageQuery = query(referenceDocs, ...constraints);
          const snapDocs = await getDocs(pageQuery);

          if (snapDocs.empty) {
            setData([]);
            setHasMoreServer(false);
          } else {
            const allDocs = snapDocs.docs;
            const hasNext = allDocs.length > currentLimit;
            setHasMoreServer(hasNext);

            const visibleDocs = hasNext ? allDocs.slice(0, currentLimit) : allDocs;

            const products = visibleDocs.map((document) => ({
              ...document.data(),
              id: document.id,
            }));
            setData(products);

            // Guardamos el marcador de la pág siguiente sin disparar renders o re-fetches fantasmas
            if (hasNext && !pageCursorsRef.current[currentPage + 1]) {
              const nextFirstDoc = allDocs[currentLimit];
              pageCursorsRef.current[currentPage + 1] = nextFirstDoc;
            }
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    getData();
  }, [categorySlug, titleSlug, id, idListString, currentPage]); 

  // ⚡ 5. Refetch memorizado de forma óptima
  const refetch = useCallback(async () => {
    if (idListString) {
      const parsedIds = JSON.parse(idListString);
      if (parsedIds.length === 0) {
        setData([]);
        setLoading(false);
        return [];
      }
      setLoading(true);
      setError(null);
      try {
        const referenceDocs = collection(db, "products");
        const q = query(referenceDocs, where(documentId(), "in", parsedIds));
        const snapDocs = await getDocs(q);

        const products = snapDocs.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));

        setData(products);
        setHasMoreServer(false);
        return products;
      } catch (err) {
        setError(err.message);
        return [];
      } finally {
        setLoading(false);
      }
    }
    return [];
  }, [idListString]);

  // 🚀 CÁLCULO EN CALIENTE: Evaluamos si la página pedida es una inconsistencia manual para avisarle a la vista
  const isInvalidPage = currentPage > 1 && !pageCursorsRef.current[currentPage];

  return { data, loading, error, refetch, totalPages, hasMoreServer, isInvalidPage };
};












































// import { useState, useEffect, useCallback, useRef } from "react";
// import {
//   collection,
//   getDocs,
//   getDoc,
//   getCountFromServer,
//   query,
//   where,
//   doc,
//   limit,
//   orderBy,
//   startAt,
//   documentId,
// } from "firebase/firestore";
// import { db } from "../config/firebase";

// export const useQuery = (
//   categorySlug = null,
//   titleSlug = null,
//   id = null,
//   idList = null,
//   currentPage = 1,
//   LIMIT_SIZE_TOTAL = 5,
//   LIMIT_SIZE_CATEGORIES = 5,
// ) => {
//   const [data, setData] = useState(categorySlug && titleSlug && id ? null : []);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // 🔒 PRIORIDAD 1: Reemplazamos el estado por un useRef para evitar re-fetches y renders en bucle
//   const pageCursorsRef = useRef({}); 
//   const [totalPages, setTotalPages] = useState(1);
//   const [hasMoreServer, setHasMoreServer] = useState(true);

//   const currentLimit = categorySlug ? LIMIT_SIZE_CATEGORIES : LIMIT_SIZE_TOTAL;
//   const idListString = idList ? JSON.stringify(idList) : "";

//   // 🔒 2. Calcular totalPages REALES desde el servidor
//   useEffect(() => {
//     if ((categorySlug && titleSlug && id) || idListString) return;

//     const getTotalCount = async () => {
//       try {
//         const referenceDocs = collection(db, "products");
//         let q = query(referenceDocs);

//         if (categorySlug) {
//           q = query(referenceDocs, where("categorySlug", "==", categorySlug));
//         }

//         const snapshot = await getCountFromServer(q);
//         const totalDocuments = snapshot.data().count;
//         const calculatedTotalPages = Math.ceil(totalDocuments / currentLimit) || 1;

//         setTotalPages(calculatedTotalPages);
//       } catch (err) {
//         console.error("Error al contar documentos de paginación:", err);
//       }
//     };

//     getTotalCount();
//   }, [categorySlug, currentLimit, id, titleSlug, idListString]);

//   // 🔒 3. EFECTO CORRECTOR: Vaciar el diccionario de cursores de forma síncrona al mutar filtro/categoría
//   useEffect(() => {
//     pageCursorsRef.current = {}; 
//     setHasMoreServer(true);
//   }, [categorySlug, currentLimit]);

//   // 🔄 4. Efecto principal: Traer los documentos (Ahora 100% libre de loops por cursores)
//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     const getData = async () => {
//       // Caso listado por ID (Carrito / Favoritos masivo)
//       if (idListString) {
//         const parsedIds = JSON.parse(idListString);
//         if (parsedIds.length === 0) {
//           setData([]);
//           setLoading(false);
//           return;
//         }

//         try {
//           const referenceDocs = collection(db, "products");
//           const q = query(referenceDocs, where(documentId(), "in", parsedIds));
//           const snapDocs = await getDocs(q);

//           const products = snapDocs.docs.map((document) => ({
//             ...document.data(),
//             id: document.id,
//           }));

//           setData(products);
//           setHasMoreServer(false);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       } 
      
//       // Caso A: Detalle de producto único por ID
//       else if (categorySlug && titleSlug && id) {
//         try {
//           const referenceDoc = doc(db, "products", id);
//           const snapDoc = await getDoc(referenceDoc);
//           if (!snapDoc.exists()) {
//             throw new Error("El documento solicitado no existe.");
//           } else {
//             setData({ ...snapDoc.data(), id: snapDoc.id });
//           }
//         } catch (error) {
//           setError(error.message);
//         } finally {
//           setLoading(false);
//         }
//       }

//       // Caso B y C unificados: Catálogo paginado por Servidor (Home y Categorías)
//       else {
//         try {
//           // 🚨 CONTROL CRÍTICO: Si vamos a pág > 1 pero el cursor no existe en el ref, cancelamos de forma segura
//           if (currentPage > 1 && !pageCursorsRef.current[currentPage]) {
//             setLoading(false);
//             return;
//           }

//           const referenceDocs = collection(db, "products");
//           let constraints = [orderBy("code")];

//           if (categorySlug) {
//             constraints.push(where("categorySlug", "==", categorySlug));
//           }

//           // Leemos directamente del objeto mutable .current sin registrar dependencias reactivas
//           if (currentPage > 1 && pageCursorsRef.current[currentPage]) {
//             constraints.push(startAt(pageCursorsRef.current[currentPage]));
//           }

//           constraints.push(limit(currentLimit + 1));

//           const pageQuery = query(referenceDocs, ...constraints);
//           const snapDocs = await getDocs(pageQuery);

//           if (snapDocs.empty) {
//             setData([]);
//             setHasMoreServer(false);
//           } else {
//             const allDocs = snapDocs.docs;
//             const hasNext = allDocs.length > currentLimit;
//             setHasMoreServer(hasNext);

//             const visibleDocs = hasNext ? allDocs.slice(0, currentLimit) : allDocs;

//             const products = visibleDocs.map((document) => ({
//               ...document.data(),
//               id: document.id,
//             }));
//             setData(products);

//             // Guardamos el marcador de la pág siguiente sin disparar renders o re-fetches fantasmas
//             if (hasNext && !pageCursorsRef.current[currentPage + 1]) {
//               const nextFirstDoc = allDocs[currentLimit];
//               pageCursorsRef.current[currentPage + 1] = nextFirstDoc;
//             }
//           }
//         } catch (error) {
//           setError(error.message);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     getData();
//   }, [categorySlug, titleSlug, id, idListString, currentPage]); 
//   // 🚀 ¡ÉXITO! Eliminamos 'pageCursors' de la matriz. El efecto solo corre si cambia la página o filtro.

//   // ⚡ 5. Refetch memorizado de forma óptima
//   const refetch = useCallback(async () => {
//     if (idListString) {
//       const parsedIds = JSON.parse(idListString);
//       if (parsedIds.length === 0) {
//         setData([]);
//         setLoading(false);
//         return [];
//       }
//       setLoading(true);
//       setError(null);
//       try {
//         const referenceDocs = collection(db, "products");
//         const q = query(referenceDocs, where(documentId(), "in", parsedIds));
//         const snapDocs = await getDocs(q);

//         const products = snapDocs.docs.map((document) => ({
//           ...document.data(),
//           id: document.id,
//         }));

//         setData(products);
//         setHasMoreServer(false);
//         return products;
//       } catch (err) {
//         setError(err.message);
//         return [];
//       } finally {
//         setLoading(false);
//       }
//     }
//     return [];
//   }, [idListString]);

//   return { data, loading, error, refetch, totalPages, hasMoreServer };
// };

