import { useCart } from "../../context/CartContext";
import { Button } from "../common/Button";
import { TrashIcon } from "../Icons/index";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { idGenerator } from "../../utils/idGenerator";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { checkoutSecureInventory } from "../../services/inventorySecureService";

export const ConfirmPurchase = ({ checkOutOn, isProcessing }) => {
  const { clearCart, getCartTotal, getCartQuantity, cart } = useCart();
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  
  const totalAmount = Number(getCartTotal());
  const formattedTotalPrice = countryPrice.format(totalAmount);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const generateOrderReview = async () => {
    const previewCartTotal = Number(getCartTotal());
    try {
      await checkOutOn();

      if (previewCartTotal === Number(getCartTotal())) {
        // ⚡ PASO 1: Descontamos el stock en lote de manera segura
        // const stockRes = await checkoutSecureInventory(cart);

        // // Si el servicio seguro de transacciones falla, lanzamos el error con su mensaje dedicado
        // if (!stockRes.success) {
        //   throw new Error(
        //     stockRes.error || "No se pudo reservar el stock de los productos.",
        //   );
        // }

        // ⚡ PASO 2: Emitimos la orden en Firestore
        const purchaseOrder = {
          id: idGenerator(),
          date: Date.now(),
          buyerFirstName: user?.firstName || "User",
          buyerSurname: user?.surname || "Registered",
          buyerEmail: user?.email || "",
          products: cart,
          total: previewCartTotal,
          buyerUid: user?.uid || user.id, // 👈 Tu regla de Firebase exige estrictamente que este ID exista
        };

        await setDoc(doc(db, "orders", purchaseOrder.id), purchaseOrder);
        clearCart();
        navigate(`/order-confirmation/${purchaseOrder.id}`, {
          state: { order: purchaseOrder },
        });
      } else {
        alert(
          "Los precios o existencias han cambiado. Por favor, revisa tu carrito.",
        );
      }
    } catch (error) {
      console.error("Fallo en la compra:", error);
      // 🚀 Alerta dinámica: Muestra "Disculpas, nos quedamos sin stock de..." si viene del servicio seguro
      alert(error.message || "No pudimos procesar tu compra. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="bg-green-300 flex flex-col justify-center items-center p-2 border border-gray-200 rounded-xl shadow-md ">
      <div className="flex flex-row justify-between w-11/12 mb-2">
        <h2 className="">Purchase summary</h2>
        <Button variant="cristal" className="px-1" onClick={() => clearCart()}>
          <TrashIcon className="w-6 h-6 text-gray-600 hover:text-blue-600" />
        </Button>
      </div>
      <div className="bg-green-200 flex flex-col justify-center items-center border border-gray-300 rounded-sm border-t-0 mb-3 p-1 w-11/12">
        <div className="flex flex-col">
          <p className="text-xs text-gray-500">Products (Quantity)</p>
          <span className="flex px-2 border-t border-b border-gray-300 text-xl justify-center items-center w-30 text-black">
            {Number(getCartQuantity())}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-500">Total (Price)</p>
          <span className="flex px-2 border-t border-gray-300 text-xl justify-center items-center w-30 text-black">
            {formattedTotalPrice}
          </span>
        </div>
      </div>
      <Button
        className="px-4 py-2 rounded-xl w-50"
        variant="primary"
        onClick={generateOrderReview}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Proceed to checkout"}
      </Button>
    </div>
  );
};