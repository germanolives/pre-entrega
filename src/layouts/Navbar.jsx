import { SearchbarContainer } from "../components/SearchbarContainer";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="grow grid grid-rows-[2fr_1fr]">
      <SearchbarContainer />
      <ul className="flex justify-evenly items-center border-t border-gray-400 text-xs">
        <li className="flex items-center">
          <Link to={"/"}>INICIO</Link>
        </li>
        <li className="flex items-center">
          <Link to={"/products"}>PRODUCTOS</Link>
        </li>
        <li className="flex items-center">
          <Link to={"/services"}>SERVICIOS</Link>
        </li>
        <li className="flex items-center">
          <Link to={"/aboutUs"}>NOSOTROS</Link>
        </li>
        <li className="flex items-center flex-col group relative">
          <Link to={"/"}>MI CUENTA</Link>
          <ul className="hidden group-hover:block absolute top-full bg-slate-200 shadow-md border border-gray-400 p-2 min-w-30 z-50 rounded-xl">
            <li className="p-0.5">
              <Link to={"/login"}>INGRESO</Link>
            </li>
            <li className="p-0.5">
              <Link to={"/register"}>REGISTRO</Link>
            </li>
          </ul>
        </li>
        <li className="flex items-center">
          <Link to={"/cart"}>CARRITO</Link>
        </li>
        <li className="flex items-center">
          <Link to={"/contact"}>CONTACTO</Link>
        </li>
      </ul>
    </nav>
  );
};
