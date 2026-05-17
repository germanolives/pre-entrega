import { OfferList } from "./OfferList"
import { RenderContent } from "../common/RenderContent";
import { useQuery } from "../../hooks/useQuery";
import { blackFridayPromos } from "../../data/offers/blackFridayPromos"; 

export const Offers = () => {
  const { data, loading, error } = useQuery();


  return (
    <section
      className={`mx-4 border-2 border-gray-400 rounded-xl p-8 ${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4 md:grid-cols-6"}`}
    >
      <RenderContent loading={loading} error={error} data={data}>
        <OfferList data={data} />
      </RenderContent>
    </section>
  );
};
