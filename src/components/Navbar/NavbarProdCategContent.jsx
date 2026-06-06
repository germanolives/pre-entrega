import { useProducts } from "../../context/ProductsContext";
import { NavProdCategList } from "./NavProdCategList";

export const NavbarProdCategContent = () => {
  const { data, loading, error } = useProducts();
  const categories = data
    ? [...new Set(data.map((item) => item.category))]
    : [];

  return (
    <>
    {!loading && !error && categories.length > 0 && (
      <NavProdCategList data={categories} />
    )}
    </>
  );
};
