import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { MovilNavbar } from "../components/Navbar/MovilNavbar";
import { SearchbarContainer } from "../components/Searchbar/SearchbarContainer";
import { Modal } from "../components/common/Modal";

export const MainLayout = () => {
  return (
    <>
      <Header
        renderNavbar={() => <Navbar />}
        renderSearchbarContainer={() => <SearchbarContainer />}
        renderMovilNavbar={(menuFn) => <MovilNavbar menuChange={menuFn} />}
      />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
      <Modal />
    </>
  );
};








// import { Header } from "./Header";
// import { Footer } from "./Footer";
// import { Outlet } from "react-router-dom";

// export const MainLayout = () => {
//   return (
//     <>
//       <Header />
//       <main className="grow">
//         <Outlet />
//       </main>
//       <Footer />
//     </>
//   );
// };
