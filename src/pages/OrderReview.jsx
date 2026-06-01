import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useQuery } from "../hooks/useQuery";
import { RenderContent } from "../components/common/RenderContent";
import { OrderReviewContent } from "../components/OrderReview/OrderReviewContent";

export const OrderReview = () => {
  const { data, loading, error } = useQuery();
  const { cart, checkCart } = useCart();

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
        <OrderReviewContent data={cart} />
      </RenderContent>
    </section>
  );
};
