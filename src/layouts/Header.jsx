import { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../data/brand/logo";
import { Button } from "../components/common/Button";
import { MenuIcon } from "../components/Icons/index";
import { useLocation } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useMenu } from "../context/MenuContext";

export const Header = ({
  navbar,
  searchbarContainer,
  movilNavbar,
  searchFilter,
  isAdmin=false,
}) => {
  const { getProductsQuantity, getTotalStock } = useProducts();
  const location = useLocation();
  const { menu, menuChange } = useMenu()

  return (
    <header className="sticky top-0 left-0 mx-4 z-50 rounded-xl bg-slate-300 mb-4">
      <div className="flex justify-between items-center">
        <Link to={`${isAdmin ? "/dashboard" : "/"}`} className="w-20 md:w-25 shrink-0">
          <img
            className={"rounded-2xl border border-gray-400 p-1 w-20 md:w-25"}
            src={logo[1].image}
            alt={logo[1].title}
            fetchPriority="high"
            loading="eager"
          />
        </Link>

        <div className={`flex flex-col grow ${isAdmin ? "gap-1" : "gap-5"}`}>
          <div>
            {searchbarContainer}
            {isAdmin && searchFilter}
          </div>
          {navbar}
          {isAdmin && (<div className="flex justify-end text-xxs border border-gray-400 rounded-sm mx-2 md:hidden">
            <span
              className={`text-right ${location.pathname === "/dashboard" ? "text-blue-600" : location.pathname.startsWith("/dashboard/edit") ? "text-green-600" : "text-blue-600"}`}
            >
              {`${location.pathname === "/dashboard" ? `[ ${getProductsQuantity()} PRODS - ${getTotalStock()} UNITS ]` : location.pathname.startsWith("/dashboard/edit") ? "[ EDITING PRODUCT ]" : "[ ADDING PRODUCT ]"}`}
            </span>
          </div>)}
        </div>

        <div className="flex flex-col items-end md:hidden">
          <Button variant="cristal" onClick={menuChange}>
            <MenuIcon
              className={`w-4 h-4 border border-gray-500 ${menu ? "text-blue-500" : "text-gray-500"} rounded-xl hover:text-blue-500 m-3 ml-1.5`}
            />
          </Button>
        </div>
      </div>
      {menu && movilNavbar}
    </header>
  );
};
