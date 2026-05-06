import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/products">Productos</Link>
        </li>
        <li>
          <Link to="/services">Servicios</Link>
        </li>
        <li>
          <Link to="/login">Mi Cuenta</Link>
          <ul>
            <li>
              <Link to="/login">Acceder</Link>
            </li>
            <li>
              <Link to="/register">Registrar</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/aboutUs">Nosotros</Link>
        </li>
        <li>
          <Link to="/cart">Carrito</Link>
        </li>
        <li>
          <Link to="/contact">Contacto</Link>
        </li>
      </ul>
    </nav>
  );
};
