import { Navbar } from "./Navbar";
import { ImgWithSkeleton } from "../components/common/ImgWithSkeleton";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 mx-4 z-50 flex rounded-xl border-2 border-gray-400 bg-slate-300 mb-4">
      <Link to={"/"}>
        <ImgWithSkeleton
          className={"rounded-2xl border-r-2"}
          size={"w-30 h-auto md:w-40 "}
          image={"/images/logo.webp"}
          title={"logo"}
          isPriority={true}
        />
      </Link>
      <Navbar />
    </header>
  );
};
