import { useQuery } from "../../hooks/useQuery";
import { useProducts } from "../../context/ProductsContext";
import { RenderContent } from "../common/RenderContent";
import { NavProdCategList } from "./NavProdCategList";

export const NavbarProdCategContent = () => {
  const { data, loading, error } = useProducts();
  const categories = data
    ? [...new Set(data.map((item) => item.category))]
    : [];

  return (
    <>
      <RenderContent data={data} loading={loading} error={error}>
        <NavProdCategList data={categories} />
      </RenderContent>
    </>
  );
};
