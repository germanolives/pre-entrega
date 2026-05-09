import { Link } from "react-router-dom";
import * as Icons from "../components/Icons/index";

export const Footer = () => {
  return (
    <footer className="bg-lime-50 grid-rows-2 mx-4 rounded-xl border-2 border-gray-400 p-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto_auto] mx-8 gap-16 ">
        <div>
          <h5 className="mb-2">TIENDA S.A.U.</h5>
          <p className="text-xs italic">
            Tienda es una empresa internacional con sede central en la provincia
            de Córdoba
          </p>
        </div>
        <div>
          <h5 className="mb-2">Menu</h5>
          <ul className="flex flex-col gap-1 text-xs italic">
            <li>
              <Link className="hover:text-blue-600" to={"/"}>
                Inicio
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600" to={"/products"}>
                Productos
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600" to={"/services"}>
                Servicios
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600" to={"/aboutUs"}>
                Nosotros
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600" to={"/login"}>
                MiCuenta
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600" to={"/cart"}>
                Carrito
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600" to={"/contact"}>
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-2">Contacto</h5>
          <ul className="flex flex-col gap-1 text-xs italic">
            <li>
              <a
                href="tel:+541112345678"
                className="flex items-center gap-2 group"
              >
                <Icons.PhoneIcon className="w-4 h-4 text-orange-600" />
                <span className="text-xs group-hover:text-blue-600">
                  +54 11 8765-4321
                </span>
              </a>
            </li>
            <li className="flex items-center">
              <a
                href="https://wa.me/5491112345678?text=Hola,%20vengo%20desde%20la%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group"
              >
                <Icons.WhatsAppIcon className="w-4 h-4 text-green-600" />
                <span className="text-xs group-hover:text-blue-600">
                  +54 911 1234-5678
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
                  +54 911 1234-5678
                </span>
              </a>
            </li>
            <li>
              <a href="mailto:info@tienda.com" className="flex items-center gap-2 group">
                <Icons.MailIcon className="w-4 h-4 text-blue-600" />
                <span className="text-xs group-hover:text-blue-600">
                  info@tienda.com
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-2">Redes Sociales</h5>
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
          <h5 className="mb-2">Ubicación</h5>
          <ul className="text-xs italic">
            <li>
              Dirección:{" "}
              <a href="https://maps.app.goo.gl/wUr5A3khp46bD28d7" target="_blank">Av. de la Transición 44, Obispo Trejo, Córdoba</a>
            </li>
            <li>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d637073.6337665524!2d-63.96224316479179!3d-31.02126938581348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9433af72fb90a365%3A0x11fe01035b49075f!2sObispo%20Trejo%2C%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1777902101568!5m2!1ses-419!2sar"
                className="h-24 md:h-30 rounded-lg"
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
          @ 2026 - Todos los derechos reservados
        </p>
        <p className="text-center text-xs">
          webSite desarrollado por: <a href="maito">ax@mail.com</a>
        </p>
      </div>
    </footer>
  );
};
