import { useParams } from "react-router-dom";
import { ItemDetail } from "../components/ItemDetail";
import { RenderContent } from "../components/common/RenderContent";
import { useQuery } from "../hooks/useQuery";

export const ProductDetail = () => {
  const { categorySlug, titleSlug, favoriteSlug, id } = useParams();
  const { data, loading, error } = useQuery(categorySlug, titleSlug, id);

  return (
    <section
      className={`mx-4 border-2 border-gray-400 rounded-xl p-8 flex justify-center items-center`}
    >
      <RenderContent loading={loading} error={error} data={data}>
        <ItemDetail data={data} favorite={favoriteSlug} />
      </RenderContent>
    </section>
  );
};










// ------------------------------------------------------------------------------------------

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { ItemDetail } from "../components/ItemDetail";
// import { RenderContent } from "../components/common/RenderContent";
// import { formatSlug } from "../utils/formatSlug";

// export const ProductDetail = () => {
//   const { categorySlug, titleSlug, favoriteSlug, id } = useParams();
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     const getData = async () => {
//       try {
//         const [resProd, resOffer] = await Promise.all([
//           fetch("/data/products.json"),
//           // fetch(`https://fakestoreapi.com/products/${id}`),
//           fetch("/data/offers.json"),
//         ]);
        
//         if (!resProd.ok) {
//           throw new Error("Producto no disponible");
//         }
//         if (!resOffer.ok) {
//           throw new Error("Ofertas no disponibles");
//         }

//         const realProd = await resProd.json();
//         const realOffer = await resOffer.json();

//         const realProductFound = realProd.find((item) => item.id === parseInt(id));
//         // const realProductFound = realProd;
//         if (!realProductFound) throw new Error("El producto no existe");

//         const categoryInJson = formatSlug(realProductFound.category);

//         if (categorySlug !== categoryInJson) {
//           throw new Error("Categoría incorrecta para este producto");
//         }
//         const productFound = {...realProductFound, offer: realOffer};


//         setData(productFound);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getData();
//   }, [categorySlug, titleSlug, id]);

//   return (
//     <section
//       className={`mx-4 border-2 border-gray-400 rounded-xl p-8 flex justify-center items-center`}
//     >
//       <RenderContent loading={loading} error={error} data={data}>
//         <ItemDetail data={data} favorite={favoriteSlug}/>
//       </RenderContent>
//     </section>
//   );
// };