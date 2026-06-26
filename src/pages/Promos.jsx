import { useParams } from "react-router-dom";
import { PromoList } from "../components/Promos/PromoList";
import { RenderContent } from "../components/common/RenderContent";
import { blackFridayPromos } from "../data/offers/blackFridayPromos";
import { Helmet } from "react-helmet-async";
import { ClientPagination } from "../components/common/ClientPagination";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";

export const Promos = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const promoProds = blackFridayPromos
    ? blackFridayPromos.find((item) => String(item.id) === id)
    : null;
  const idList = promoProds?.appliesTo
    ? promoProds.appliesTo.map((item) => String(item))
    : [];

  const { data, loading, error } = useQuery(
    null,
    null,
    null,
    idList,
    currentPage,
  );


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
      <RenderContent loading={loading} error={error} data={data}>
        <ClientPagination searchedProds={data} itemsPerPage={4}>
          {(paginatedProds) => (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <PromoList
                data={paginatedProds}
                promo={promoProds || { title: "Promo" }}
              />
            </div>
          )}
        </ClientPagination>
      </RenderContent>
    </section>
  );
};
