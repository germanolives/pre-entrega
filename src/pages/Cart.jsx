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

  useEffect(() => {
    if (data && !loading && data.length > 0 && !hasSyncedInitial.current) {
      checkCart(data);
      hasSyncedInitial.current = true; // cierra la compuerta para el resto de la sesión
    }
  }, [data, loading, checkCart]);

  // ⚡ MOMENTO 2: Check manual al presionar "Proceed to checkout"
  const checkOutOn = async () => {
    if (idListCart.length === 0) return;
    

    setIsCheckingOut(true);
    try {
      const [freshProducts] = await Promise.all([
        refetch(),
        new Promise((resolve) => setTimeout(resolve, 1500)), // Espera visual "Procesando..."
      ]);

      if (freshProducts && freshProducts.length > 0) {
        checkCart(freshProducts);
        setIsCheckingOut(false);
        return;
      }
    } catch (e) {
      console.error("Error en la validación del checkout:", e);
      setIsCheckingOut(false);
    }
    setIsCheckingOut(false);
  };

  const hasItems = Array.isArray(cart) && cart.length > 0;

return (
    <section className="mx-4 border-2 border-gray-300 rounded-xl p-2 md:p-8 min-h-125 flex flex-col justify-between">
      <Helmet>
        <title>Your Shopping Cart | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Review your selected items in your shopping cart. Secure checkout and fast shipping on all your orders."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {hasItems ? (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 w-full h-full my-auto">
          
          <RenderContent
            data={data}
            loading={loading} 
            error={error}
            time={0}
          >
            <CartList data={cart} />
          </RenderContent>

          <div className="flex justify-end w-full">
            <aside className="w-full md:w-80 sticky top-30 right-8 self-start">
              <ConfirmPurchase
                checkOutOn={checkOutOn}
                isProcessing={isCheckingOut} // 🔒 Este se queda en true gracias al return de arriba
              />
            </aside>
          </div>

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full my-auto">
          <EmptyCart />
        </div>
      )}
    </section>
  );
};
