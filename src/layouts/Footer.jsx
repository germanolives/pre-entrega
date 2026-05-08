export const Footer = () => {
  return (
    <footer className="bg-lime-50 grid-rows-2 mx-4 rounded-xl border-2 border-gray-400 p-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-4 ">
        <div>
          <h5>TIENDA S.A.U.</h5>
          <p className="text-xs italic">
            Tienda es una empresa internacional con sede central en la provincia
            de Córdoba
          </p>
        </div>
        <div>
          <h5>Menu</h5>
          <ul>
            <li>INICIO</li>
            <li>PRODUCTOS</li>
            <li>SERVICIOS</li>
            <li>CONTACTO</li>
            <li>CARRITO</li>
          </ul>
        </div>
        <div>
          <h5>CONTACTO Y REDES</h5>
          <ul>
            <li>
              Teléfono: <a href="">+54 11 1234-5678</a>
            </li>
            <li>
              Whatsapp: <a href="">+54 911 8765-4321</a>
            </li>
            <li>
              Correo: <a href="">tienda@mail.com</a>
            </li>
            <li>
              Facebook: <a href="">tienda@mail.com</a>
            </li>
            <li>
              Instagram: <a href="">tienda@mail.com</a>
            </li>
          </ul>
        </div>
        <div>
          <h5>UBICACIÓN</h5>
          <ul>
            <li>
              Dirección:{" "}
              <a href="">Av. de la Transición 44, Obispo Trejo, Córdoba</a>
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
