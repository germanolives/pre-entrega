import { Header } from "../components/Dashboard/Header";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Dashboard/Navbar";
import { MovilNavbar } from "../components/Dashboard/MovilNavbar";
import { SearchbarContainer } from "../components/Dashboard/SearchbarContainer";
import { SearchFilter } from "../components/Dashboard/SearchFilter";
import { Modal } from "../components/common/Modal";
import { AlertContainer } from "../components/Alerts/AlertContainer";
import { InventoryProvider } from "../context/InventoryContext";

export const DashboardLayout = () => {
  return (
    <InventoryProvider>
      <Header
        navbar={<Navbar />}
        searchbarContainer={<SearchbarContainer />}
        searchFilter={<SearchFilter />}
        movilNavbar={<MovilNavbar />}
      />
      <main className="grow">
        <Outlet />
      </main>
      <Modal />
      <AlertContainer />
    </InventoryProvider>
  );
};
