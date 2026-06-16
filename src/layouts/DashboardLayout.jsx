import { Header } from "../components/Dashboard/Header";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Dashboard/Navbar";
import { MovilNavbar } from "../components/Dashboard/MovilNavbar";
import { SearchbarContainer } from "../components/Dashboard/SearchbarContainer";
import { Modal } from "../components/common/Modal";

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
      <Modal />
    </>
  );
};
