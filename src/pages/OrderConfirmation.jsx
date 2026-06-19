import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Helmet } from "react-helmet-async";


export const OrderConfirmation = () => {
  const { state } = useLocation();
  const { orderId } = useParams();
  const [order, setOrder] = useState(state?.order || null);
  const [loading, setLoading] = useState(!state?.order);

  const date = new Date(order.date).toLocaleString();

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

  if (loading)
    return <p className="text-center p-10">Loading your purchase details...</p>;
  if (!order)
    return (
      <p className="text-center p-10">
        The order was not found. Perhaps the ID is incorrect?
      </p>
    );

  return (
    <div className="p-8 max-w-2xl mx-auto border rounded-2xl border-gray-300">
      <Helmet>
        <title>Order Confirmation | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Thank you for your purchase! Your order has been successfully placed. You will receive an email shortly with your order details and tracking information."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">Thank you for your order.!</h1>
      <p className="text-gray-600">
        Buyer:{" "}
        <span className="font-mono bg-gray-100 px-2 rounded">
          {order.buyer}
        </span>
      </p>
      <p className="text-gray-600">
        Order Nº:{" "}
        <span className="font-mono bg-gray-100 px-2 rounded">{order.id}</span>
      </p>
      <p className="text-gray-600">
        Date: <span className="font-mono bg-gray-100 px-2 rounded">{date}</span>
      </p>

      <div className="mt-8 border-t pt-6">
        <h3 className="font-bold text-xl mb-4">Product details:</h3>
        <ul className="space-y-2">
          {order.products?.map((product) => (
            <li key={product.id} className="flex justify-between border-b pb-2">
              <span>
                {product.title} (x{product.quantity})
              </span>
              <span className="font-medium">
                €{(product.price * product.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between items-center text-2xl font-bold">
          <span>Total amount to pay:</span>
          <span>€{order.total?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
