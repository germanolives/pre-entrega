import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { RenderContent } from "../components/common/RenderContent";
import { CartList } from "../components/Cart/CartList";
import { EmptyCart } from "../components/Cart/EmptyCart";
import { ConfirmPurchase } from "../components/Cart/ConfirmPuchase";

export const Cart = () => {
  const { cart, checkCart } = useCart();
  const { data, loading, error, refetch } = useProducts();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data && !loading && data.length > 0) {
      checkCart(data);
    }
  }, [data, loading]);

  const checkOutOn = () => {
    refetch();
  };

  return (
    <section
      className={`flex flex-col gap-4 md:flex-row mx-4 border-2 border-gray-300 rounded-xl p-4 justify-between`}
    >
      <RenderContent data={data} loading={loading} error={error}>
        {cart.length > 0 ? (
          <>
            <CartList data={cart} />
            <aside className="w-full md:w-80 sticky top-30 right-8 self-start">
              <ConfirmPurchase checkOutOn={checkOutOn} />
            </aside>
          </>
        ) : (
          <EmptyCart />
        )}
      </RenderContent>
    </section>
  );
};
