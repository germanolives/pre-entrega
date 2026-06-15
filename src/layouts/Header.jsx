import { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../data/brand/logo";
import { Button } from "../components/common/Button";
import { MenuIcon } from "../components/Icons/index";
import { SearchbarContainer } from "../components/Searchbar/SearchbarContainer";
import { Navbar } from "../components/Navbar/Navbar";
import { MovilNavbar } from "../components/Navbar/MovilNavbar";

export const Header = () => {
  const [menu, setMenu] = useState(false);
  const menuChange = () => setMenu((prev) => !prev);

  return (
    <header className="sticky top-0 left-0 mx-4 z-50 rounded-xl bg-slate-300 mb-4">
      <div className="flex justify-between items-center">
        <Link to={"/"} className="w-20 md:w-25 shrink-0">
          <img
            className={"rounded-2xl border border-gray-400 p-1 w-20 md:w-25"}
            src={logo[1].image}
            alt={logo[1].title}
            fetchPriority="high"
            loading="eager"
          />
        </Link>
        <div className="flex flex-col grow gap-5">
          <SearchbarContainer />
          <Navbar />
        </div>
        <div className="flex flex-col items-end md:hidden">
          <Button variant="cristal" onClick={menuChange}>
            <MenuIcon
              className={`w-4 h-4 border border-gray-500 ${menu ? "text-blue-500" : "text-gray-500"} rounded-xl hover:text-blue-500 m-3 ml-1.5`}
            />
          </Button>
        </div>
      </div>
      {menu && <MovilNavbar menuChange={menuChange} />}
    </header>
  );
};

























// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { logo } from "../data/brand/logo";
// import { Button } from "../components/common/Button";
// import { MenuIcon } from "../components/Icons/index";

// export const Header = ({
//   renderNavbar,
//   renderMovilNavbar,
//   renderSearchbarContainer,
// }) => {
//   const [menu, setMenu] = useState(false);
//   const menuChange = () => setMenu((prev) => !prev);

//   return (
//     <header className="py-0.75 sticky top-0 left-0 mx-4 z-50 rounded-xl bg-slate-300 mb-4 md:py-0">
//       <div className="flex justify-between items-center">
//         <Link to={"/"} className="w-15 md:w-25 shrink-0">
//           <img
//             className={"rounded-2xl border border-gray-400 p-1 w-15 md:w-25"}
//             src={logo[1].image}
//             alt={logo[1].title}
//             fetchPriority="high"
//             loading="eager"
//           />
//         </Link>
//         <div className="flex grow md:hidden">{renderSearchbarContainer()}</div>
//         {renderNavbar()}
//         <div className="flex flex-col items-end md:hidden">
//           <Button variant="cristal" onClick={menuChange}>
//             <MenuIcon
//               className={`w-4 h-4 border border-gray-500 ${menu ? "text-blue-500" : "text-gray-500"} rounded-xl hover:text-blue-500 m-3 ml-1.5`}
//             />
//           </Button>
//         </div>
//       </div>
//       {menu && renderMovilNavbar(menuChange)}
//     </header>
//   );
// };
