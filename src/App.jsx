import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Services } from "./pages/Services";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AboutUs } from "./pages/AboutUs";
import { Cart } from "./pages/Cart";
import { Contact } from "./pages/Contact";
import { ScrollToTop } from "./components/common/ScrollTo";
import { ScrollControlls } from "./components/common/ScrollControlls";
import { Categories } from "./pages/Categories";
import { FiltredProducts } from "./pages/FiltredProducts";

export const App = () => {
  return (
    <>
      <ScrollToTop />
      <ScrollControlls />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="services" element={<Services />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="products/search/:filterSlug"
            element={<FiltredProducts />}
          />
          <Route path="products/:categorySlug/" element={<Categories />} />
          <Route
            path="products/:categorySlug/:titleSlug/:favoriteSlug/:id"
            element={<ProductDetail />}
          />
        </Route>
      </Routes>
    </>
  );
};
