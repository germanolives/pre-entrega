import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Dashboard/Navbar";
import { MovilNavbar } from "../components/Dashboard/MovilNavbar";
import { SearchbarContainer } from "../components/Dashboard/SearchbarContainer";
import { SearchFilter } from "../components/Dashboard/SearchFilter";
import { Modal } from "../components/common/Modal";

export const DashboardLayout = () => {
  return (
    <>
      <Header
        navbar={<Navbar />}
        searchbarContainer={<SearchbarContainer />}
        searchFilter={<SearchFilter />}
        movilNavbar={<MovilNavbar />}
        isAdmin={true}
      />
      <main className="grow">
        <Outlet />
      </main>
      <Modal />
    </>
  );
};
