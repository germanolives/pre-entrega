import { NavProdCategList } from "./NavProdCategList";
import { categories } from "../../data/config/categories";

export const NavbarProdCategContent = ({ listMenuView, resetMenuView }) => {
  const showCategories = categories
    ? [...new Set(categories.map((item) => item.category))]
    : [];

  return (
    <>
      {showCategories.length > 0 && (
        <NavProdCategList
          data={showCategories}
          listMenuView={listMenuView}
          resetMenuView={resetMenuView}
        />
      )}
    </>
  );
};
