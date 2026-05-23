import { useCart } from "../context/CartContext";
import { CartList } from "../components/Cart/CartList";
import { EmptyCart } from "../components/Cart/EmptyCart";

export const Cart = () => {
  const { cart } = useCart();
  return (
    <section
      className={`mx-4 border-2 border-gray-400 rounded-xl p-4 flex`}
    >{cart.length > 0 ? <CartList data={cart} /> : <EmptyCart />}
      
      
    </section>
  );
};
