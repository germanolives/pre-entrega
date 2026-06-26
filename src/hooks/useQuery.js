// src/hooks/useQuery.js
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getDoc,
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
  const [data, setData] = useState(
    categorySlug && titleSlug && id ? null : [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pageCursors, setPageCursors] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [hasMoreServer, setHasMoreServer] = useState(true);

  // const LIMIT_SIZE_TOTAL = 5;
  // const LIMIT_SIZE_CATEGORIES = 5;
  const currentLimit = categorySlug ? LIMIT_SIZE_CATEGORIES : LIMIT_SIZE_TOTAL;

  useEffect(() => {
    setLoading(true);
    setError(null);

    const getData = async () => {
      if (idList) {
        if (idList.length === 0) {
          setData([]);
          setLoading(false);
          return;
        }

        try {
          const referenceDocs = collection(db, "products");
          const q = query(referenceDocs, where(documentId(), "in", idList));
          const snapDocs = await getDocs(q);

          const products = snapDocs.docs.map((document) => ({
            ...document.data(),
            id: document.id,
          }));

          setData(products);
          setHasMoreServer(false);
          setTotalPages(1);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      // Caso A: Búsqueda por ID único
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
      
      // Caso B y C unificados: Catálogo general y Categorías
      else {
        try {
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
            if (currentPage === 1) {
              setTotalPages(1);
            }
          } else {
            const allDocs = snapDocs.docs;
            const hasNext = allDocs.length > currentLimit;
            setHasMoreServer(hasNext);

            const visibleDocs = hasNext
              ? allDocs.slice(0, currentLimit)
              : allDocs;

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

              if (currentPage + 1 > totalPages) {
                setTotalPages(currentPage + 1);
              }
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
  }, [categorySlug, titleSlug, id, JSON.stringify(idList), currentPage]);

  useEffect(() => {
    setPageCursors({});
    setTotalPages(1);
    setHasMoreServer(true);
  }, [categorySlug]);


  const refetch = async () => {
    if (idList) {
      if (idList.length === 0) {
        setData([]);
        setLoading(false);
        return [];
      }
      setLoading(true);
      setError(null);
      try {
        const referenceDocs = collection(db, "products");
        const q = query(referenceDocs, where(documentId(), "in", idList));
        const snapDocs = await getDocs(q);

        const products = snapDocs.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));

        setData(products);
        setHasMoreServer(false);
        setTotalPages(1);
        return products; // Devolvemos la data directo al botón
      } catch (err) {
        setError(err.message);
        return [];
      } finally {
        setLoading(false);
      }
    }
    return [];
  };

  return { data, loading, error, refetch, totalPages, hasMoreServer };
};



































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
//   startAfter, // 🚀 1. Importamos startAfter para mover el cursor
// } from "firebase/firestore";
// import { db } from "../config/firebase";

// export const useQuery = (categorySlug = null, titleSlug = null, id = null) => {
//   const [data, setData] = useState(
//     categorySlug && titleSlug && id ? null : categorySlug ? [] : [],
//   );
//   const [loading, setLoading] = useState(true);
//   const [isFetchingMore, setIsFetchingMore] = useState(false); // 🚀 Estado auxiliar para la paginación
//   const [error, setError] = useState(null);
//   const [reload, setReload] = useState(false);

//   // 🧠 Estados de control para el paginado del servidor
//   const [lastVisible, setLastVisible] = useState(null);
//   const [hasMoreServer, setHasMoreServer] = useState(true);

//   const LIMIT_SIZE_TOTAL = 20;
//   const LIMIT_SIZE_CATEGORIES = 5;

//   // 📥 2. FUNCIÓN PARA TRAER LA SIGUIENTE PÁGINA (Poco a poco)
//   const fetchNextPage = async () => {
//     // Si ya está buscando, o no hay más en el server, o no hay un puntero inicial, cancelamos
//     if (isFetchingMore || !hasMoreServer || !lastVisible) return;

//     setIsFetchingMore(true);
//     setError(null);

//     try {
//       const referenceDocs = collection(db, "products");
//       let nextQuery;

//       // Evaluamos en qué vista estamos para armar la query continuada
//       if (categorySlug && titleSlug == null && id == null) {
//         nextQuery = query(
//           referenceDocs,
//           where("categorySlug", "==", categorySlug),
//           orderBy("code"),
//           startAfter(lastVisible), // 🚀 Arranca exactamente después del último cargado
//           limit(LIMIT_SIZE_CATEGORIES)
//         );
//       } else if (!categorySlug && !titleSlug && !id) {
//         nextQuery = query(
//           referenceDocs,
//           orderBy("code"),
//           startAfter(lastVisible), // 🚀 Arranca exactamente después del último cargado
//           limit(LIMIT_SIZE_TOTAL)
//         );
//       } else {
//         return; // Caso A no se pagina
//       }

//       const snapDocs = await getDocs(nextQuery);

//       if (snapDocs.empty) {
//         setHasMoreServer(false);
//       } else {
//         const nextProducts = snapDocs.docs.map((document) => ({
//           ...document.data(),
//           id: document.id,
//         }));

//         // 📌 SÚPER IMPORTANTE: Agregamos los nuevos elementos atrás de los existentes
//         setData((prevData) => [...prevData, ...nextProducts]);

//         // Actualizamos el marcapáginas con el último de esta nueva tanda
//         setLastVisible(snapDocs.docs[snapDocs.docs.length - 1]);

//         // Verificamos si este bloque completó el límite o fue el último
//         const currentLimit = categorySlug ? LIMIT_SIZE_CATEGORIES : LIMIT_SIZE_TOTAL;
//         setHasMoreServer(snapDocs.docs.length === currentLimit);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsFetchingMore(false);
//     }
//   };

//   // 🔄 3. El useEffect inicial se mantiene IGUAL a tu código, pero resetea punteros al cambiar parámetros
//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     // Al cambiar de filtro o categoría, reiniciamos el paginado
//     setLastVisible(null);
//     setHasMoreServer(true);

//     const getData = async () => {
//       if (categorySlug && titleSlug && id) {
//         try {
//           const referenceDoc = doc(db, "products", id);
//           const snapDoc = await getDoc(referenceDoc);
//           if (!snapDoc.exists()) {
//             throw new Error("El documento solicitado no existe en la base de datos.");
//           } else {
//             const product = { ...snapDoc.data(), id: snapDoc.id };
//             setData(product);
//           }
//         } catch (error) {
//           setError(error.message);
//         } finally {
//           setLoading(false);
//         }
//       }
//       else if (categorySlug && titleSlug == null && id == null) {
//         try {
//           const referenceDocs = collection(db, "products");
//           const categoryQuery = query(
//             referenceDocs,
//             where("categorySlug", "==", categorySlug),
//             orderBy("code"),
//             limit(LIMIT_SIZE_CATEGORIES),
//           );
//           const snapDocs = await getDocs(categoryQuery);
//           if (snapDocs.empty) {
//             setData([]);
//             setHasMoreServer(false);
//           } else {
//             const category = snapDocs.docs.map((document) => ({
//               ...document.data(),
//               id: document.id,
//             }));
//             setData(category);
//             setLastVisible(snapDocs.docs[snapDocs.docs.length - 1]);
//             setHasMoreServer(snapDocs.docs.length === LIMIT_SIZE_CATEGORIES);
//           }
//         } catch (error) {
//           setError(error.message);
//         } finally {
//           setLoading(false);
//         }
//       }
//       else {
//         try {
//           const referenceDocs = collection(db, "products");
//           const initialQuery = query(
//             referenceDocs,
//             orderBy("code"),
//             limit(LIMIT_SIZE_TOTAL),
//           );

//           const snapDocs = await getDocs(initialQuery);
//           if (snapDocs.empty) {
//             setData([]);
//             setHasMoreServer(false);
//           } else {
//             const products = snapDocs.docs.map((document) => ({
//               ...document.data(),
//               id: document.id,
//             }));
//             setData(products);
//             setLastVisible(snapDocs.docs[snapDocs.docs.length - 1]);
//             setHasMoreServer(snapDocs.docs.length === LIMIT_SIZE_TOTAL);
//           }
//         } catch (error) {
//           setError(error.message);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     getData();
//   }, [categorySlug, titleSlug, id, reload]);

//   const refetch = () => {
//     setReload((prev) => !prev);
//   };

//   // 🚀 Retornamos los métodos nuevos para que el Contexto pueda distribuirlos
//   return { data, loading, error, refetch, lastVisible, hasMoreServer, fetchNextPage, isFetchingMore };
// };

// // import { useState, useEffect } from "react";
// // import {
// //   collection,
// //   getDocs,
// //   getDoc,
// //   query,
// //   where,
// //   doc,
// // } from "firebase/firestore";
// // import { db } from "../config/firebase";

// // export const useQuery = (categorySlug = null, titleSlug = null, id = null) => {
// //   const [data, setData] = useState(
// //     categorySlug && titleSlug && id ? null : categorySlug ? [] : [],
// //   );
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [reload, setReload] = useState(false);

// //   useEffect(() => {
// //     setLoading(true);
// //     setError(null);

// //     const getData = async () => {
// //       // Caso A: Búsqueda de un repuesto específico por ID (Detalle del producto)
// //       if (categorySlug && titleSlug && id) {
// //         try {
// //           const referenceDoc = doc(db, "products", id);
// //           const snapDoc = await getDoc(referenceDoc);
// //           if (!snapDoc.exists()) {
// //             throw new Error(
// //               "El documento solicitado no existe en la base de datos.",
// //             );
// //           } else {
// //             const product = { ...snapDoc.data(), id: snapDoc.id };
// //             setData(product);
// //           }
// //         } catch (error) {
// //           setError(error.message);
// //         } finally {
// //           setLoading(false);
// //         }
// //       }
// //       // Caso B: Filtrado de catálogo por categoría (Filtros de navegación)
// //       else if (categorySlug && titleSlug == null && id == null) {
// //         try {
// //           const referenceDocs = collection(db, "products");
// //           const categoryQuery = query(
// //             referenceDocs,
// //             where("categorySlug", "==", categorySlug),
// //           );
// //           const snapDocs = await getDocs(categoryQuery);
// //           if (snapDocs.empty) {
// //             throw new Error(
// //               "Los documentos solicitados no existen en la base de datos.",
// //             );
// //           } else {
// //             const category = snapDocs.docs.map((document) => ({
// //               ...document.data(),
// //               id: document.id,
// //             }));
// //             setData(category);
// //           }
// //         } catch (error) {
// //           setError(error.message);
// //         } finally {
// //           setLoading(false);
// //         }
// //       }
// //       // Caso C: Retorna el catálogo completo original
// //       else {
// //         try {
// //           const referenceDocs = collection(db, "products");
// //           const snapDocs = await getDocs(referenceDocs);
// //           if (snapDocs.empty) {
// //             throw new Error(
// //               "Los documentos solicitados no existen en la base de datos.",
// //             );
// //           } else {
// //             const products = snapDocs.docs.map((document) => ({
// //               ...document.data(),
// //               id: document.id,
// //             }));
// //             setData(products);
// //           }
// //         } catch (error) {
// //           setError(error.message);
// //         } finally {
// //           setLoading(false);
// //         }
// //       }
// //     };
// //     getData();
// //   }, [categorySlug, titleSlug, id, reload]);

// //   const refetch = () => {
// //     setReload((prev) => !prev);
// //   };

// //   return { data, loading, error, refetch };
// // };
