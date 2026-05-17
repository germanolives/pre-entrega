import { ItemList } from "../components/Item/ItemList";
import { RenderContent } from "../components/common/RenderContent";
import { useQuery } from "../hooks/useQuery";
import { useParams } from "react-router-dom";

export const FiltredProducts = () => {
  const { filterSlug } = useParams();
  const { data, loading, error } = useQuery();

  const cleanFilter = filterSlug ? filterSlug.toLowerCase() : "";
  const searchedProds =
    data && cleanFilter
      ? data.filter((item) => item.title.toLowerCase().includes(cleanFilter))
      : [];

  return (
    <section
      className={`mx-4 border-2 border-gray-400 rounded-xl p-8 ${loading ? "flex justify-center items-center" : "grid grid-cols-1 gap-4 md:grid-cols-6"}`}
    >
      <RenderContent loading={loading} error={error} data={searchedProds}>
        <ItemList data={searchedProds} />
      </RenderContent>
    </section>
  );
};
