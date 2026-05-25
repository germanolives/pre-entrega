import { Navbar } from "../components/Navbar/Navbar";
import { MovilNavbar } from "../components/Navbar/MovilNavbar";
import { Link } from "react-router-dom";
import { logo } from "../data/brand/logo";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 mx-4 z-50 flex rounded-xl border-2 border-gray-300 bg-slate-300 mb-4">
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
      <MovilNavbar />
    </header>
  );
};
