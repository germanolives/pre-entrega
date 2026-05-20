import { useCart } from "../context/CartContext";
import { CartList } from "../components/Cart/CartList";

export const Cart = () => {
  const { cart } = useCart();
  return (
    <section
      className={`mx-4 border-2 border-gray-400 rounded-xl p-4 flex`}
    >
      <CartList data={cart} />
    </section>
  );
};
