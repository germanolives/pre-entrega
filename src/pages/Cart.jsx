import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useQuery } from "../hooks/useQuery";
import { RenderContent } from "../components/common/RenderContent";
import { CartList } from "../components/Cart/CartList";
import { EmptyCart } from "../components/Cart/EmptyCart";
import { ConfirmPurchaseContent } from "../components/Cart/ConfirmPurchaseContent";

export const Cart = () => {
  const { cart, checkCart } = useCart();
  const { data, loading, error } = useQuery();

  useEffect(() => {
    if (data && !loading && data.length > 0) {
      checkCart(data);
    }
  }, [data, loading]);

  return (
    <section
      className={`flex flex-col gap-4 md:flex-row mx-4 border-2 border-gray-300 rounded-xl p-4 justify-between`}
    >
      <RenderContent data={data} loading={loading} error={error}>
        {cart.length > 0 ? (
          <>
            <CartList data={cart} />
            <ConfirmPurchaseContent data={cart}/>
          </>
        ) : (
          <EmptyCart />
        )}
      </RenderContent>
    </section>
  );
};
