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
import { Favorites } from "./pages/Favorites";
import { Contact } from "./pages/Contact";
import { ScrollToTop } from "./components/common/ScrollTo";
import { ScrollControllsWithWhatsapp } from "./components/common/ScrollControllsWithWhatsapp";
import { Categories } from "./pages/Categories";
import { FiltredProducts } from "./pages/FiltredProducts";
import { Promos } from "./pages/Promos";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { FiltredDashboard } from "./pages/FiltredDashboard";
import { DashboardDetail } from "./pages/DashboardDetail";
import { DashboardNewItemContainer } from "./pages/DashboardNewItemContainer";

export const App = () => {
  return (
    <>
      <ScrollToTop />
      <ScrollControllsWithWhatsapp />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="services" element={<Services />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="products/search/:filterSlug"
            element={<FiltredProducts />}
          />
          <Route path="promos/black-friday/:id" element={<Promos />} />
          <Route path="products/:categorySlug/" element={<Categories />} />
          <Route
            path="products/:categorySlug/:titleSlug/:id"
            element={<ProductDetail />}
          />
        </Route>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="/dashboard/add-product"
            element={<DashboardNewItemContainer />}
          />
          <Route
            path="/dashboard/search/:fieldSlug/:filterSlug"
            element={<FiltredDashboard />}
          />
          <Route
            path="/dashboard/edit/:categorySlug/:titleSlug/:id"
            element={<DashboardDetail />}
          />
        </Route>
      </Routes>
    </>
  );
};
