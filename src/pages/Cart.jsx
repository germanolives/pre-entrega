import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { RenderContent } from "../components/common/RenderContent";
import { CartList } from "../components/Cart/CartList";
import { EmptyCart } from "../components/Cart/EmptyCart";
import { ConfirmPurchase } from "../components/Cart/ConfirmPuchase";

export const Cart = () => {
  const { cart, checkCart } = useCart();
  const { data, loading, error, refetch } = useProducts();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data && !loading && data.length > 0) {
      checkCart(data);
    }
  }, [data, loading]);

  const checkOutOn = async () => {
    setIsCheckingOut(true);
    try {
      // Simulamos un poco de tiempo para que el usuario lea "Procesando..."
      await Promise.all([
        refetch(),
        new Promise((resolve) => setTimeout(resolve, 500)),
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCheckingOut(false);
      // El navigate se ejecutará desde el ConfirmPurchase después de esto
    }
  };

  return (
    <section
      className={`flex flex-col gap-4 md:grid grid-cols-2 mx-4 border-2 border-gray-300 rounded-xl p-4`}
    >
      <RenderContent data={data} loading={loading} error={error}>
        {Array.isArray(cart) && cart.length > 0 ? (
          <>
            <CartList data={cart} />
          </>
        ) : (
          <EmptyCart />
        )}
      </RenderContent>
      {Array.isArray(cart) && cart.length > 0 && (
        <div className="flex justify-end">
          <aside className="w-full md:w-80 sticky top-30 right-8 self-start">
            <ConfirmPurchase
              checkOutOn={checkOutOn}
              isProcessing={isCheckingOut}
            />
          </aside>
        </div>
      )}
    </section>
  );
};
