import { useQuery } from "../../hooks/useQuery";
import { RenderContent } from "../common/RenderContent";
import { NavProdCategList } from "./NavProdCategList";

export const NavbarProdCategContent = () => {
  const { data, loading, error } = useQuery();
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
