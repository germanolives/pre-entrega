import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extraemos el objeto 'order' que viene en el state
  const order = location.state?.order;

  // OPCIONAL: Si el usuario entra a la URL manualmente (sin venir de la compra),
  // lo redirigimos al inicio porque no hay datos de orden que mostrar.
  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  if (!order) return null; // O un spinner mientras redirige

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">¡Order Confirmation: {order.buyer}!</h1>
      <p className="text-lg">ID de tu orden: <span className="font-mono">{order.id}</span></p>
      
      <div className="mt-6">
        <h3 className="font-bold">Detalle de productos:</h3>
        <ul>
          {order.products.map((product) => (
            <li key={product.id}>
              {product.title} - Cantidad: {product.quantity} - Precio: {product.price}
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold mt-4">Total pagado: {order.total}</p>
      </div>
    </div>
  );
};