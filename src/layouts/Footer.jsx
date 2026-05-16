import { Link } from "react-router-dom";
import * as Icons from "../components/Icons/index";
import { TeamContainer } from "../components/Team/TeamContainer";

export const Footer = () => {
  return (
    <footer className="bg-lime-50 grid-rows-2 mx-4 rounded-xl border-2 border-gray-400 p-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr_2fr_2fr] mx-8 gap-8 ">
        <div>
          <h5 className="mb-2">TIENDA S.A.U.</h5>
          <p className="text-xs italic mb-2">
            Tienda is an international company headquartered in the province of
            Córdoba.
          </p>
          <TeamContainer />
        </div>
        <div>
          <h5 className="mb-2">Menu</h5>
          <ul className="flex flex-col gap-1 text-xs italic">
            <li>
              <Link className="hover:text-blue-600" to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600" to={"/products"}>
                Products
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600" to={"/services"}>
                Services
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600" to={"/aboutUs"}>
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600" to={"/login"}>
                My Account
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600" to={"/cart"}>
                Cart
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600" to={"/contact"}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-2">Contact</h5>
          <ul className="flex flex-col gap-1 text-xs italic">
            <li>
              <a
                href="tel:+543575654321"
                className="flex items-center gap-2 group"
              >
                <Icons.PhoneIcon className="w-4 h-4 text-orange-600" />
                <span className="text-xs group-hover:text-blue-600">
                  +54 3575 654321
                </span>
              </a>
            </li>
            <li className="flex items-center">
              <a
                href="https://wa.me/5493575123456?text=Hola,%20vengo%20desde%20la%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group"
              >
                <Icons.WhatsAppIcon className="w-4 h-4 text-green-600" />
                <span className="text-xs group-hover:text-blue-600">
                  +54 9 3575 123456
                </span>
              </a>
            </li>
            <li className="flex items-center">
              <a
                href="https://t.me/tienda_sau"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group"
              >
                <Icons.TelegramIcon className="w-4 h-4 text-sky-500" />
                <span className="text-xs group-hover:text-blue-600">
                  +54 9 3575 123456
                </span>
              </a>
            </li>
            <li>
              <a
                href="mailto:info@tienda.com"
                className="flex items-center gap-2 group"
              >
                <Icons.MailIcon className="w-4 h-4 text-blue-600" />
                <span className="text-xs group-hover:text-blue-600">
                  info@tienda.com
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-2">Social networks</h5>
          <ul className="flex flex-col gap-1 text-xs italic">
            <li>
              <a href="#" className="flex items-center gap-2 group">
                <Icons.FacebookIcon className="w-4 h-4 text-blue-700" />
                <span className="text-xs group-hover:text-blue-600">
                  Facebook
                </span>
              </a>
            </li>
            <li className="flex items-center">
              <a href="#" className="flex items-center gap-2 group">
                <Icons.InstagramIcon className="w-4 h-4 text-pink-600" />
                <span className="text-xs group-hover:text-blue-600">
                  Instagram
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 group">
                <Icons.YoutubeIcon className="w-4 h-4 text-red-600" />
                <span className="text-xs group-hover:text-blue-600">
                  Youtube
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-2">Location</h5>
          <ul className="text-xs italic">
            <li className="mb-2">
              Address:{" "}
              <a
                href="https://maps.app.goo.gl/wUr5A3khp46bD28d7"
                target="_blank"
              >
                44, Transición's Avenue, Trejo Bishop, Córdoba
              </a>
            </li>
            <li>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d637073.6337665524!2d-63.96224316479179!3d-31.02126938581348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9433af72fb90a365%3A0x11fe01035b49075f!2sObispo%20Trejo%2C%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1777902101568!5m2!1ses-419!2sar"
                className="w-full aspect-video rounded-lg shadow-sm"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Tienda S.A.U."
              ></iframe>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 pt-8">
        <p className="text-center text-xs">
          @ 2026 - All rights reserved
        </p>
        <p className="text-center text-xs">
          Website developed by:{" "}
          <a href="maito">siempreytodoslosdias@gmail.com</a>
        </p>
      </div>
    </footer>
  );
};
