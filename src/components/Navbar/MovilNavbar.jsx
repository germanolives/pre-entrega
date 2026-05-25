// import { SearchbarContainer } from "../Searchbar/SearchbarContainer";
import { Link } from "react-router-dom";
import { NavbarProdCategContent } from "./NavbarProdCategContent";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { CartIcon, MenuIcon } from "../Icons/index";
import { Button } from "../common/Button";

export const MovilNavbar = () => {
  const location = useLocation();
  const { getCartQuantity } = useCart();
  return (
    <nav className="grow flex flex-row justify-end items-center md:hidden">
        <Button variant="cristal">

       <MenuIcon className="w-15 h-15 text-gray-500 border border-gray-500 rounded-xl mr-2 hover:text-blue-500" />
        </Button>

    </nav>
  );
};
