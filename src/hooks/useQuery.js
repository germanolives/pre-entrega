import { useState, useEffect, useCallback } from "react";
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

  const [pageCursors, setPageCursors] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [hasMoreServer, setHasMoreServer] = useState(true);

  const currentLimit = categorySlug ? LIMIT_SIZE_CATEGORIES : LIMIT_SIZE_TOTAL;

  // 🔒 1. Serialización limpia para dependencias de arrays (Evita loops y ejecuciones inline)
  const idListString = idList ? JSON.stringify(idList) : "";

  // 🔒 2. Calcular totalPages REALES desde el servidor (Sin pisar cursores)
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
        console.error("Error al contar documentos de paginación:", err);
      }
    };

    getTotalCount();
  }, [categorySlug, currentLimit, id, titleSlug, idListString]);

  // 🔒 3. EFECTO CORRECTOR: Limpiar cursores inmediatamente al mutar la categoría
  useEffect(() => {
    setPageCursors({});
    setHasMoreServer(true);
  }, [categorySlug, currentLimit]);

  // 🔄 4. Efecto principal: Traer los documentos correspondientes a la página activa
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
          // 🚨 CONTROL CRÍTICO: Si el usuario quiere ir a la página > 1 pero el cursor
          // aún no se asentó en memoria, frenamos y esperamos al siguiente ciclo.
          if (currentPage > 1 && !pageCursors[currentPage]) {
            return;
          }

          const referenceDocs = collection(db, "products");
          let constraints = [orderBy("code")];

          if (categorySlug) {
            constraints.push(where("categorySlug", "==", categorySlug));
          }

          if (currentPage > 1 && pageCursors[currentPage]) {
            constraints.push(startAt(pageCursors[currentPage]));
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

            if (hasNext && !pageCursors[currentPage + 1]) {
              const nextFirstDoc = allDocs[currentLimit];
              setPageCursors((prev) => ({
                ...prev,
                [currentPage + 1]: nextFirstDoc,
              }));
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
  }, [categorySlug, titleSlug, id, idListString, currentPage, pageCursors]);

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

  return { data, loading, error, refetch, totalPages, hasMoreServer };
};






















// // src/hooks/useQuery.js
// import { useState, useEffect } from "react";
// import {
//   collection,
//   getDocs,
//   getDoc,
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
//   const [data, setData] = useState(
//     categorySlug && titleSlug && id ? null : [],
//   );
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [pageCursors, setPageCursors] = useState({});
//   const [totalPages, setTotalPages] = useState(1);
//   const [hasMoreServer, setHasMoreServer] = useState(true);

//   // const LIMIT_SIZE_TOTAL = 5;
//   // const LIMIT_SIZE_CATEGORIES = 5;
//   const currentLimit = categorySlug ? LIMIT_SIZE_CATEGORIES : LIMIT_SIZE_TOTAL;

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     const getData = async () => {
//       if (idList) {
//         if (idList.length === 0) {
//           setData([]);
//           setLoading(false);
//           return;
//         }

//         try {
//           const referenceDocs = collection(db, "products");
//           const q = query(referenceDocs, where(documentId(), "in", idList));
//           const snapDocs = await getDocs(q);

//           const products = snapDocs.docs.map((document) => ({
//             ...document.data(),
//             id: document.id,
//           }));

//           setData(products);
//           setHasMoreServer(false);
//           setTotalPages(1);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       }

//       // Caso A: Búsqueda por ID único
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

//       // Caso B y C unificados: Catálogo general y Categorías
//       else {
//         try {
//           const referenceDocs = collection(db, "products");
//           let constraints = [orderBy("code")];

//           if (categorySlug) {
//             constraints.push(where("categorySlug", "==", categorySlug));
//           }

//           if (currentPage > 1 && pageCursors[currentPage]) {
//             constraints.push(startAt(pageCursors[currentPage]));
//           }

//           constraints.push(limit(currentLimit + 1));

//           const pageQuery = query(referenceDocs, ...constraints);
//           const snapDocs = await getDocs(pageQuery);

//           if (snapDocs.empty) {
//             setData([]);
//             setHasMoreServer(false);
//             if (currentPage === 1) {
//               setTotalPages(1);
//             }
//           } else {
//             const allDocs = snapDocs.docs;
//             const hasNext = allDocs.length > currentLimit;
//             setHasMoreServer(hasNext);

//             const visibleDocs = hasNext
//               ? allDocs.slice(0, currentLimit)
//               : allDocs;

//             const products = visibleDocs.map((document) => ({
//               ...document.data(),
//               id: document.id,
//             }));
//             setData(products);

//             if (hasNext && !pageCursors[currentPage + 1]) {
//               const nextFirstDoc = allDocs[currentLimit];
//               setPageCursors((prev) => ({
//                 ...prev,
//                 [currentPage + 1]: nextFirstDoc,
//               }));

//               if (currentPage + 1 > totalPages) {
//                 setTotalPages(currentPage + 1);
//               }
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
//   }, [categorySlug, titleSlug, id, JSON.stringify(idList), currentPage]);

//   useEffect(() => {
//     setPageCursors({});
//     setTotalPages(1);
//     setHasMoreServer(true);
//   }, [categorySlug]);

//   const refetch = async () => {
//     if (idList) {
//       if (idList.length === 0) {
//         setData([]);
//         setLoading(false);
//         return [];
//       }
//       setLoading(true);
//       setError(null);
//       try {
//         const referenceDocs = collection(db, "products");
//         const q = query(referenceDocs, where(documentId(), "in", idList));
//         const snapDocs = await getDocs(q);

//         const products = snapDocs.docs.map((document) => ({
//           ...document.data(),
//           id: document.id,
//         }));

//         setData(products);
//         setHasMoreServer(false);
//         setTotalPages(1);
//         return products; // Devolvemos la data directo al botón
//       } catch (err) {
//         setError(err.message);
//         return [];
//       } finally {
//         setLoading(false);
//       }
//     }
//     return [];
//   };

//   return { data, loading, error, refetch, totalPages, hasMoreServer };
// };
