import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Services } from "./pages/Services";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AboutUs } from "./pages/AboutUs";
import { Cart } from "./pages/Cart";
import { Contact } from "./pages/Contact";

export const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          {/* <Route path="/products/item/:id" element={<ProductDetail />} /> */}
          {/* <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
