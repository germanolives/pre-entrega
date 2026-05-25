import { useParams } from "react-router-dom";
import { PromoList } from "../components/Promos/PromoList";
import { RenderContent } from "../components/common/RenderContent";
import { useQuery } from "../hooks/useQuery";
import { blackFridayPromos } from "../data/offers/blackFridayPromos";

export const Promos = () => {
  const { data, loading, error } = useQuery();
  const {id} = useParams();

  const promoProds = blackFridayPromos
    ? blackFridayPromos.find((item) => item.id === Number(id))
    : null;

  const promoData =
    data && promoProds
      ? data.filter((item) => promoProds.appliesTo.includes(item.id))
      : [];

  return (
    <section
      className={`mx-4 border-2 border-gray-300 rounded-xl p-8 ${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4 md:grid-cols-4"}`}
    >
      <RenderContent loading={loading} error={error} data={promoData}>
        <PromoList data={promoData} promo={promoProds}/>
      </RenderContent>
    </section>
  );
};
