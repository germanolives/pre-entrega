import { useParams } from "react-router-dom";
import { ItemDetail } from "../components/Item/ItemDetail";
import { RenderContent } from "../components/common/RenderContent";
import { useQuery } from "../hooks/useQuery";

export const ProductDetail = () => {
  const { categorySlug, titleSlug, id } = useParams();
  
  const { data, loading, error } = useQuery(categorySlug, titleSlug, id);

  return (
    <section className="mx-4 border-2 border-gray-400 rounded-xl p-8 min-h-125 flex items-center justify-center">
      
      <RenderContent loading={loading} error={error} data={data} time={150}>
        <ItemDetail data={data} />
      </RenderContent>
      
    </section>
  );
};
