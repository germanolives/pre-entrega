import { Navbar } from "./Navbar";
import { Search } from "../components/common/Search";

export const Header = () => {
  return (
    <header>
      <img src="/images/logo.webp" alt="logo TIENDA" />
      <Search />
      <Navbar />   
    </header>
  );
};