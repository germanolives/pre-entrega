import { ItemList } from "../components/Item/ItemList";
import { RenderContent } from "../components/common/RenderContent";
import { useQuery } from "../hooks/useQuery";
import { useParams } from "react-router-dom";
// import { formatSlug } from "../utils/formatSlug";

export const Categories = () => {
  const { categorySlug } = useParams();
  const { data, loading, error } = useQuery(categorySlug);

  // const categ = data
  //   ? data.filter((item) => formatSlug(item.category) === categorySlug)
  //   : [];

  return (
    <section
      className={`mx-4 border-2 border-gray-300 rounded-xl p-8 ${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4 md:grid-cols-5"}`}
    >
      <RenderContent loading={loading} error={error} data={data}>
        <ItemList data={data} />
      </RenderContent>
    </section>
  );
};
