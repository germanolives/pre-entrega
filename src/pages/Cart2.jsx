import { useCart } from "../context/CartContext";
import { CartList } from "../components/Cart/CartList";
import { EmptyCart } from "../components/Cart/EmptyCart";
//import { ConfirmPurchase2 } from "../components/Cart/ConfirmPurchase2";

export const Cart2 = () => {
  const { cart } = useCart();

  return (
    <section
      className={`flex flex-col gap-4 md:flex-row mx-4 border-2 border-gray-300 rounded-xl p-4 justify-between`}
    >
      {cart.length > 0 ? (
        <>
          <CartList data={cart} />
          <aside className="w-full md:w-80 sticky top-30 right-8 self-start">
            <ConfirmPurchase2 />
          </aside>
        </>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
};
