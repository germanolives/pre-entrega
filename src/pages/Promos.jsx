import { useParams } from "react-router-dom";
import { PromoList } from "../components/Promos/PromoList";
import { RenderContent } from "../components/common/RenderContent";
import { useProducts } from "../context/ProductsContext";
import { blackFridayPromos } from "../data/offers/blackFridayPromos";
import { Helmet } from "react-helmet-async";
import { Pagination } from "../components/common/Pagination";

export const Promos = () => {
  const { data, loading, error } = useProducts();
  const { id } = useParams();

  const promoProds = blackFridayPromos
    ? blackFridayPromos.find((item) => String(item.id) === id)
    : null;

  const promoProdsWithStringId = promoProds?.appliesTo
    ? promoProds.appliesTo.map((item) => String(item))
    : [];

  const promoData =
    data && promoProdsWithStringId.length > 0
      ? data.filter((item) => promoProdsWithStringId.includes(String(item.id)))
      : [];

  return (
    <section
      className={`mx-4 border-2 border-gray-300 rounded-xl p-8 ${loading ? "flex justify-center items-center" : ""}`}
    >
      <Helmet>
        <title>Special Offers | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Don't miss our exclusive deals! Shop the latest discounts on clothing and electronics at Tienda S.A.U. Limited time offers available."
        />
      </Helmet>
      <RenderContent loading={loading} error={error} data={promoData}>
        <Pagination searchedProds={promoData} itemsPerPage={4}>
          {(paginatedProds) => (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <PromoList
                data={paginatedProds}
                promo={promoProds || { title: "Promoción" }}
              />
            </div>
          )}
        </Pagination>
      </RenderContent>
    </section>
  );
};
