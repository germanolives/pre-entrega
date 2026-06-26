import { useEffect, useState, useRef } from "react";
import { useCart } from "../context/CartContext";
import { RenderContent } from "../components/common/RenderContent";
import { CartList } from "../components/Cart/CartList";
import { EmptyCart } from "../components/Cart/EmptyCart";
import { useQuery } from "../hooks/useQuery";
import { ConfirmPurchase } from "../components/Cart/ConfirmPuchase";
import { Helmet } from "react-helmet-async";

export const Cart = () => {
  const { cart, checkCart, idListCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // 🚩 Bandera para que la sincronización del montaje ocurra una sola vez
  const hasSyncedInitial = useRef(false);

  const { data, loading, error, refetch } = useQuery(
    null,
    null,
    null,
    idListCart,
  );

  // 🔄 MOMENTO 1: Check automático al montar (apenas llega la data inicial de useQuery)
  useEffect(() => {
    if (data && !loading && data.length > 0 && !hasSyncedInitial.current) {
      checkCart(data);
      hasSyncedInitial.current = true; // 🔒 Cerramos la compuerta para el resto de la sesión
    }
  }, [data, loading]);

  // ⚡ MOMENTO 2: Check manual al presionar "Proceed to checkout" usando el nuevo refetch
  const checkOutOn = async () => {
    if (idListCart.length === 0) return;

    setIsCheckingOut(true);
    try {
      // 🚀 Al resolver la promesa, capturamos los productos actualizados directo de la red
      const [freshProducts] = await Promise.all([
        refetch(),
        new Promise((resolve) => setTimeout(resolve, 1500)), // Espera visual "Procesando..."
      ]);

      // Sincronizamos el contexto inmediatamente con la data fresca, esquivando delays de estado
      if (freshProducts && freshProducts.length > 0) {
        checkCart(freshProducts);
      }
    } catch (e) {
      console.error("Error en la validación del checkout:", e);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <section className="flex flex-col gap-4 md:grid grid-cols-2 mx-4 border-2 border-gray-300 rounded-xl p-4">
      <Helmet>
        <title>Your Shopping Cart | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Review your selected items in your shopping cart. Secure checkout and fast shipping on all your orders."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {Array.isArray(cart) && cart.length > 0 ? (
        <>
        <RenderContent
          data={data}
          loading={loading || isCheckingOut}
          error={error}
          time={isCheckingOut ? 1500 : 0}
        >
          <CartList data={cart} />
        </RenderContent>
                <div className="flex justify-end">
          <aside className="w-full md:w-80 sticky top-30 right-8 self-start">
            <ConfirmPurchase
              checkOutOn={checkOutOn}
              isProcessing={isCheckingOut}
            />
          </aside>
        </div>
        </>
      ) : (
        <EmptyCart />
      )}

    </section>
  );
};
