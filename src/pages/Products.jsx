import { ItemList } from "../components/Item/ItemList";
import { RenderContent } from "../components/common/RenderContent";
import { useQuery } from "../hooks/useQuery";
import { Helmet } from "react-helmet-async";
import { Pagination } from "../components/common/Pagination";
import { useSearchParams } from "react-router-dom";

export const Products = () => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { data, loading, error, totalPages, hasMoreServer } = useQuery(
    null,
    null,
    null,
    null,
    currentPage,
  );

  return (
    <section
      className={`mx-4 border-2 border-gray-300 rounded-xl p-8 ${loading ? "flex justify-center items-center" : ""}`}
    >
      <Helmet>
        <title>Catalog | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Explore our premium selection of clothing and electronics."
        />
      </Helmet>

      <RenderContent loading={loading} error={error} data={data}>
        {/* 📦 La grilla ahora dibuja directamente la data limpia que manda Firestore */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <ItemList data={data} />
        </div>

        {/* 🎛️ La paginación va al pie y solo controla los botones y estados informados por la DB */}
        <Pagination totalPages={totalPages} hasMoreServer={hasMoreServer} />
      </RenderContent>
    </section>
  );
};

// import { ItemList } from "../components/Item/ItemList";
// import { RenderContent } from "../components/common/RenderContent";
// import { useProducts } from "../context/ProductsContext";
// import { Helmet } from "react-helmet-async";
// import { Pagination } from "../components/common/Pagination";

// export const Products = () => {
//   const { data, loading, error } = useProducts();

//   return (
//     <section
//       className={`mx-4 border-2 border-gray-300 rounded-xl p-8 ${loading ? "flex justify-center items-center" : ""}`}
//     >
//       <Helmet>
//         <title>Catalog | Tienda S.A.U.</title>
//         <meta
//           name="description"
//           content="Explore our premium selection of clothing and electronics."
//         />
//       </Helmet>
//       <RenderContent loading={loading} error={error} data={data}>
//         <Pagination searchedProds={data} itemsPerPage={5}>
//           {(paginatedProds) => (
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
//               <ItemList data={paginatedProds} />
//             </div>
//           )}
//         </Pagination>
//       </RenderContent>
//     </section>
//   );
// };
