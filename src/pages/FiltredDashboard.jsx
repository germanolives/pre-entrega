import { useState } from "react";
import { RenderContent } from "../components/common/RenderContent";
import { useProducts } from "../context/ProductsContext";
import { useParams } from "react-router-dom";
import { ProductList } from "../components/Dashboard/ProductList";
import { Button } from "../components/common/Button";
import { Helmet } from "react-helmet-async";
import { capitalize } from "../utils/capitalize";

export const FiltredDashboard = () => {
  const { fieldSlug, filterSlug } = useParams();
  const { data, loading, error } = useProducts();
  const [fieldOrder, selectFieldOrder] = useState({
    name: "title",
    order: true,
  });

  const cleanField = fieldSlug ? fieldSlug.trim() : "";
  const cleanFilter = filterSlug ? filterSlug.toLowerCase().trim() : "";
  const displayFilter = capitalize(cleanFilter);

  const searchedProds =
    data && cleanFilter && cleanField
      ? data.filter((item) => {
          if (item[cleanField] === undefined || item[cleanField] === null)
            return false;
          const valueAsString = String(item[cleanField]).toLowerCase();
          return valueAsString.includes(cleanFilter);
        })
      : [];

  return (
    <section
      className={` md:mx-15 border-2 border-gray-300 rounded-xl p-8 ${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4"}`}
    >
      <Helmet key={displayFilter}>
        <title>
          {displayFilter
            ? `Search Results for: "${displayFilter}" | Tienda S.A.U.`
            : "Searching... | Tienda S.A.U."}
        </title>
        <meta
          name="description"
          content={`Discover our products matching your search for ${displayFilter || "productos"}.Find the best deals at Tienda S.A.U.`}
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <RenderContent data={data} loading={loading} error={error}>
        <div className="flex flex-row flex-wrap  md:grid grid-cols-[minmax(120px,200px)_minmax(100px,200px)_minmax(100px,200px)_minmax(75px,100px)_minmax(50px,100px)_25px_25px] p-3 bg-cyan-300 border border-gray-300 gap-3 rounded-sm text-xs justify-center md:sticky top-25 items-start">
          <Button
            onClick={() =>
              selectFieldOrder((prev) => ({
                ...prev,
                name: "code",
                order: prev.name === "code" ? !prev.order : true,
              }))
            }
            variant="primary"
            className="px-1 rounded-sm text-center"
          >
            COD
          </Button>
          <Button
            onClick={() =>
              selectFieldOrder((prev) => ({
                ...prev,
                name: "title",
                order: prev.name === "title" ? !prev.order : true,
              }))
            }
            variant="primary"
            className="px-1 rounded-sm text-center"
          >
            TIT
          </Button>
          <Button
            onClick={() =>
              selectFieldOrder((prev) => ({
                ...prev,
                name: "category",
                order: prev.name === "category" ? !prev.order : true,
              }))
            }
            variant="primary"
            className="px-1 rounded-sm text-center"
          >
            CAT
          </Button>
          <Button
            onClick={() =>
              selectFieldOrder((prev) => ({
                ...prev,
                name: "price",
                order: prev.name === "price" ? !prev.order : true,
              }))
            }
            variant="primary"
            className="px-1 rounded-sm text-center"
          >
            PRI
          </Button>
          <Button
            onClick={() =>
              selectFieldOrder((prev) => ({
                ...prev,
                name: "stock",
                order: prev.name === "stock" ? !prev.order : true,
              }))
            }
            variant="primary"
            className="px-1 rounded-sm text-center"
          >
            STO
          </Button>
          <span className="hidden md:flex items-center justify-center rounded-sm text-white font-semibold bg-green-500 px-1">
            EDT
          </span>
          <span className="hidden md:flex items-center justify-center rounded-sm text-white font-semibold bg-red-400 px-1">
            DEL
          </span>
        </div>
        <ProductList select={fieldOrder} data={searchedProds} />
      </RenderContent>
    </section>
  );
};














// import { useState } from "react";
// import { RenderContent } from "../components/common/RenderContent";
// import { useProducts } from "../context/ProductsContext";
// import { useParams, useSearchParams } from "react-router-dom"; // 🌟 Importamos useSearchParams
// import { ProductList } from "../components/Dashboard/ProductList";
// import { Button } from "../components/common/Button";
// import { Helmet } from "react-helmet-async";
// import { capitalize } from "../utils/capitalize";

// export const FiltredDashboard = () => {
//   const { fieldSlug, filterSlug } = useParams();
//   const { data, loading, error } = useProducts();

//   // 🌟 1. Control de Query Parameters (?page=1)
//   const [searchParams, setSearchParams] = useSearchParams();
//   const currentPage = parseInt(searchParams.get("page") || "1", 10);
//   const itemsPerPage = 3; // Límite bajo para probar con tus 11 productos

//   const [fieldOrder, selectFieldOrder] = useState({
//     name: "title",
//     order: true,
//   });

//   const cleanField = fieldSlug ? fieldSlug.trim() : "";
//   const cleanFilter = filterSlug ? filterSlug.toLowerCase().trim() : "";
//   const displayFilter = capitalize(cleanFilter);

//   // Array con todos los productos filtrados por la búsqueda
//   const searchedProds =
//     data && cleanFilter && cleanField
//       ? data.filter((item) => {
//           if (item[cleanField] === undefined || item[cleanField] === null)
//             return false;
//           const valueAsString = String(item[cleanField]).toLowerCase();
//           return valueAsString.includes(cleanFilter);
//         })
//       : [];

//   // 🌟 2. Matemática de la paginación en el cliente
//   const totalItems = searchedProds.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   // Segmentamos el array original para extraer solo los de la página activa
//   const paginatedProds = searchedProds.slice(startIndex, endIndex);

//   // 🌟 3. Función para cambiar de página modificando la URL
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setSearchParams({ page: newPage });
//     }
//   };

//   return (
//     <section
//       className={`md:mx-15 border-2 border-gray-300 rounded-xl p-8 ${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4"}`}
//     >
//       <Helmet key={displayFilter}>
//         <title>
//           {displayFilter
//             ? `Search Results for: "${displayFilter}" | Tienda S.A.U.`
//             : "Searching... | Tienda S.A.U."}
//         </title>
//         <meta name="description" content="Dashboard search results." />
//         <meta name="robots" content="noindex, nofollow" />
//       </Helmet>

//       <RenderContent data={data} loading={loading} error={error}>
//         {/* Cabecera / Botones de ordenamiento */}
//         <div className="flex flex-row flex-wrap md:grid grid-cols-[minmax(120px,200px)_minmax(100px,200px)_minmax(100px,200px)_minmax(75px,100px)_minmax(50px,100px)_25px_25px] p-3 bg-cyan-300 border border-gray-300 gap-3 rounded-sm text-xs justify-center md:sticky top-25 items-start">
//           <Button
//             onClick={() =>
//               selectFieldOrder((prev) => ({
//                 ...prev,
//                 name: "code",
//                 order: prev.name === "code" ? !prev.order : true,
//               }))
//             }
//             variant="primary"
//             className="px-1 rounded-sm text-center"
//           >
//             COD
//           </Button>
//           <Button
//             onClick={() =>
//               selectFieldOrder((prev) => ({
//                 ...prev,
//                 name: "title",
//                 order: prev.name === "title" ? !prev.order : true,
//               }))
//             }
//             variant="primary"
//             className="px-1 rounded-sm text-center"
//           >
//             TIT
//           </Button>
//           <Button
//             onClick={() =>
//               selectFieldOrder((prev) => ({
//                 ...prev,
//                 name: "category",
//                 order: prev.name === "category" ? !prev.order : true,
//               }))
//             }
//             variant="primary"
//             className="px-1 rounded-sm text-center"
//           >
//             CAT
//           </Button>
//           <Button
//             onClick={() =>
//               selectFieldOrder((prev) => ({
//                 ...prev,
//                 name: "price",
//                 order: prev.name === "price" ? !prev.order : true,
//               }))
//             }
//             variant="primary"
//             className="px-1 rounded-sm text-center"
//           >
//             PRI
//           </Button>
//           <Button
//             onClick={() =>
//               selectFieldOrder((prev) => ({
//                 ...prev,
//                 name: "stock",
//                 order: prev.name === "stock" ? !prev.order : true,
//               }))
//             }
//             variant="primary"
//             className="px-1 rounded-sm text-center"
//           >
//             STO
//           </Button>
//           <span className="hidden md:flex items-center justify-center rounded-sm text-white font-semibold bg-green-500 px-1">
//             EDT
//           </span>
//           <span className="hidden md:flex items-center justify-center rounded-sm text-white font-semibold bg-red-400 px-1">
//             DEL
//           </span>
//         </div>

//         {/* 🌟 Pasamos SOLAMENTE los productos paginados a la lista visual */}
//         <ProductList select={fieldOrder} data={paginatedProds} />

//         {/* 🌟 4. Interfaz de controles de Paginación */}
//         {totalItems > itemsPerPage && (
//           <div className="flex flex-row justify-center items-center gap-4 mt-6">
//             <Button
//               variant="outline"
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-3 py-1 text-xs"
//             >
//               ◀ Previous
//             </Button>

//             <span className="text-xs font-medium text-gray-600">
//               Page {currentPage} of {totalPages}
//             </span>

//             <Button
//               variant="outline"
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 text-xs"
//             >
//               Next ▶
//             </Button>
//           </div>
//         )}
//       </RenderContent>
//     </section>
//   );
// };

