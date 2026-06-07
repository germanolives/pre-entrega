import { Header } from "../components/Dashboard/Header";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Dashboard/Navbar";
import { MovilNavbar } from "../components/Navbar/MovilNavbar";
import { SearchbarContainer } from "../components/Searchbar/SearchbarContainer";

export const DashboardLayout = () => {
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
    </>
  );
};
