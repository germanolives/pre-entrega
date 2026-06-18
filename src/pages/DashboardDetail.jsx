import { useParams } from "react-router-dom";
import { DashboardItemContainer } from "../components/Dashboard/DashboardItemContainer";
import { RenderContent } from "../components/common/RenderContent";
import { useProducts } from "../context/ProductsContext";

export const DashboardDetail = () => {
  const { categorySlug, titleSlug, id } = useParams();
  const { data, loading, error } = useProducts(categorySlug, titleSlug, id);

  return (
    <section
      className={`mx-4 md:mx-15 border-2 border-gray-300 rounded-xl p-8 flex justify-center items-center`}
    >
      <RenderContent loading={loading} error={error} data={data}>
        <DashboardItemContainer data={data} />
      </RenderContent>
    </section>
  );
};
