import { useParams } from "react-router-dom";
import { DashboardItemDetail } from "../components/Dashboard/DashboardItemDetail";
import { RenderContent } from "../components/common/RenderContent";
import { useProducts } from "../context/ProductsContext";

export const DashboardDetail = () => {
  const { categorySlug, titleSlug, id } = useParams();
  const { data, loading, error } = useProducts(categorySlug, titleSlug, id);

  return (
    <section
      className={`mx-4 border-2 border-gray-400 rounded-xl p-8 flex justify-center items-center`}
    >
      <RenderContent loading={loading} error={error} data={data}>
        <DashboardItemDetail data={data} />
      </RenderContent>
    </section>
  );
};



