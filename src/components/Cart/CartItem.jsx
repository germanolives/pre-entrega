import { useCart } from "../../context/CartContext";
import { Button } from "../common/Button";
import { ImgWithSkeleton } from "../common/ImgWithSkeleton";

export const CartItem = ({ item }) => {
  const { addToCart, clearCart, getCartQuantity, getCartTotal } = useCart();

  return <article>
    {item.title} {getCartQuantity(item)} {getCartTotal(item)}
  </article>;
};
