import { SearchbarContainer } from "../components/SearchbarContainer";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="grow grid grid-rows-[2fr_1fr]">
      <SearchbarContainer />
      <ul className="hidden md:flex justify-evenly items-center border-t border-gray-400 text-xs">
        <li className="flex items-center">
          <Link to={"/"}>HOME</Link>
        </li>
        <li className="flex items-center">
          <Link to={"/products"}>PRODUCTS</Link>
        </li>
        <li className="flex items-center">
          <Link to={"/services"}>SERVICES</Link>
        </li>
        <li className="flex items-center">
          <Link to={"/aboutUs"}>ABOUT US</Link>
        </li>
        <li className="flex items-center flex-col group relative">
          <Link to={"/login"}>MY ACCOUNT</Link>
          <ul className="hidden group-hover:block absolute top-full bg-slate-200 shadow-md border border-gray-400 p-2 min-w-30 z-50 rounded-xl">
            <li className="p-0.5">
              <Link to={"/login"}>LOGIN</Link>
            </li>
            <li className="p-0.5">
              <Link to={"/register"}>REGISTER</Link>
            </li>
          </ul>
        </li>
        <li className="flex items-center">
          <Link to={"/cart"}>CART</Link>
        </li>
        <li className="flex items-center">
          <Link to={"/contact"}>CONTACT</Link>
        </li>
      </ul>
    </nav>
  );
};
