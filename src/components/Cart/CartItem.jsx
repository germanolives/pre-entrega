import { useCart } from "../../context/CartContext";
import { Button } from "../common/Button";
import { ImgWithSkeleton } from "../common/ImgWithSkeleton";
import { TrashIcon } from "../Icons/index";

export const CartItem = ({ item }) => {
  const { addToCart, clearCart, getCartQuantity, getCartTotal } = useCart();
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  const formattedTotalPrice = countryPrice.format(getCartTotal(item));
  const formattedUnitPrice = countryPrice.format(
    getCartTotal(item) / item.quantity,
  );

  return (
    <article className="flex flex-col border border-gray-400 rounded-xl p-2">
      <div className="flex flex-row justify-between">
        <h2>{item.title}</h2>
        <Button
          variant="cristal"
          className="px-1"
          onClick={() => clearCart(item)}
        >
          <TrashIcon className="w-4 h-4 text-gray-600 hover:text-blue-600" />
        </Button>
      </div>
      <div className="flex flex-row justify-between items-center  gap-12">
        <ImgWithSkeleton
          title={item.title}
          image={item.image}
          className={`object-contain p-2`}
          size={`w-25 h-25`}
        />

        <div className="flex">
          <p>Quantity</p>
          <div>
            
          </div>
          <span className="px-5 border border-gray-400 rounded-2xl w-25">
            {getCartQuantity(item)}
          </span>
          <div className="flex flex-col">
            <Button
              variant="ghost"
              className="text-xxs px-2 py-1 rounded-xl min-w-4 transition-all"
              disabled={item.stock - item.quantity == 0}
              onClick={() => addToCart(item, 1)}
            >
              🔼
            </Button>
            <Button
              variant="ghost"
              className="text-xxs px-2 py-1 rounded-xl min-w-4 transition-all"
              disabled={item.quantity == 1}
              onClick={() => addToCart(item, -1)}
            >
              🔽
            </Button>
          </div>
        </div>
        <div>
          <p>Unit Price</p>

          <span className="px-5">{formattedUnitPrice}</span>
        </div>
        <div>
          <p>Available Stock</p>

          <span className="px-5">{item.stock - item.quantity}</span>
        </div>
        <div className="flex flex-col">
          <p>Price</p>
          <p>{formattedTotalPrice}</p>
        </div>
      </div>
    </article>
  );
};
