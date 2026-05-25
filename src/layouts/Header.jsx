import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { MovilNavbar } from "../components/Navbar/MovilNavbar";
import { Link } from "react-router-dom";
import { logo } from "../data/brand/logo";
import { Button } from "../components/common/Button";
import { MenuIcon } from "../components/Icons/index";
import { SearchbarContainer } from "../components/Searchbar/SearchbarContainer";

export const Header = () => {
  const [menu, setMenu] = useState(false);
  const menuChange = () => setMenu((prev) => !prev);

  return (
    <header className="sticky top-0 left-0 mx-4 z-50 rounded-xl border-2 border-gray-300 bg-slate-300 mb-4">
      <div className="flex justify-between items-center">
        <Link to={"/"} className="w-40 shrink-0">
          <img
            className={"rounded-2xl border-r-2 w-40"}
            src={logo.image}
            alt={logo.title}
            fetchPriority="high"
            loading="eager"
          />
        </Link>
        <Navbar />
        <div className="flex flex-col items-end md:hidden">
          <Button variant="cristal" onClick={menuChange}>
            <MenuIcon
              className={`w-10 h-10 border border-gray-500 ${menu ? "text-blue-500" : "text-gray-500"} rounded-xl hover:text-blue-500 m-3`}
            />
          </Button>
        </div>
      </div>
      <div className="md:hidden">
        <SearchbarContainer />
        {menu && <MovilNavbar menuChange={menuChange} />}
      </div>
    </header>
  );
};
