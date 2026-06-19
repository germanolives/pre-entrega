import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Dashboard/Navbar";
import { MovilNavbar } from "../components/Dashboard/MovilNavbar";
import { SearchbarContainer } from "../components/Dashboard/SearchbarContainer";
import { SearchFilter } from "../components/Dashboard/SearchFilter";
import { Modal } from "../components/common/Modal";
import { AlertContainer } from "../components/Alerts/AlertContainer";
import { useAuth } from "../context/AuthContext";

export const DashboardLayout = () => {
  const { user } = useAuth();
  const isAdmin = user ? user.rol === "admin" : false;
  return (
    <>
      <Header
        navbar={<Navbar />}
        searchbarContainer={<SearchbarContainer />}
        searchFilter={<SearchFilter />}
        movilNavbar={<MovilNavbar />}
        isAdmin={isAdmin}
        isDashboard={true}

      />
      <main className="grow">
        <Outlet />
      </main>
      <Modal />
      <AlertContainer />
    </>
  );
};
