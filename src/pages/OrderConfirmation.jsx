import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

// ... (tus imports igual)

export const OrderConfirmation = () => {
  const { state } = useLocation();
  const { orderId } = useParams();
  const [order, setOrder] = useState(state?.order || null);
  const [loading, setLoading] = useState(!state?.order);

  useEffect(() => {
    if (order) return;

    const fetchOrder = async () => {
      setLoading(true); // Aseguramos el estado de carga
      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrder(docSnap.data());
        }
      } catch (error) {
        console.error("Error al recuperar orden:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [order, orderId]);

  if (loading) return <p className="text-center p-10">Cargando detalles de tu compra...</p>;
  if (!order) return <p className="text-center p-10">No se encontró la orden. ¿Quizás el ID es incorrecto?</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">¡Gracias por tu compra!</h1>
      <p className="text-gray-600">ID de tu orden: <span className="font-mono bg-gray-100 px-2 rounded">{order.id}</span></p>

      <div className="mt-8 border-t pt-6">
        <h3 className="font-bold text-xl mb-4">Detalle de productos:</h3>
        <ul className="space-y-2">
          {order.products?.map((product) => (
            <li key={product.id} className="flex justify-between border-b pb-2">
              <span>{product.title} (x{product.quantity})</span>
              <span className="font-medium">€{(product.price * product.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between items-center text-2xl font-bold">
          <span>Total pagado:</span>
          <span>€{order.total?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};