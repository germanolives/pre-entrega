import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
};
