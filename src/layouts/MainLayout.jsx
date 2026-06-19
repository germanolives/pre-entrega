import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { MovilNavbar } from "../components/Navbar/MovilNavbar";
import { SearchbarContainer } from "../components/Searchbar/SearchbarContainer";
import { Modal } from "../components/common/Modal";
import { AlertContainer } from "../components/Alerts/AlertContainer";
import { useAuth } from "../context/AuthContext";

export const MainLayout = () => {
  const { user } = useAuth();
  const isAdmin = user ? user.rol === "admin" : false;
  return (
    <>
      <Header
        navbar={<Navbar />}
        searchbarContainer={<SearchbarContainer />}
        movilNavbar={<MovilNavbar />}
        isAdmin={isAdmin}
        isDashboard={false}
      />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
      <Modal />
      <AlertContainer />
    </>
  );
};
