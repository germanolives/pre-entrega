import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Button } from "../common/Button";
import { ImgWithSkeleton } from "../common/ImgWithSkeleton";
import { formatSlug } from "../../utils/formatSlug";
import { TrashIcon } from "../Icons/index";

export const CartItem = ({ item }) => {
  const {
    addToCart,
    clearCart,
    getCartQuantity,
    getCartTotal,
    resetProdQtyCart,
  } = useCart();
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  const formattedTotalPrice = countryPrice.format(getCartTotal(item));
  const formattedUnitPrice = countryPrice.format(
    getCartTotal(item) / item.quantity,
  );

  return (
    <article className="flex flex-col bg-cyan-100 border border-gray-400 rounded-xl p-2">
      <div className="flex flex-row justify-between items-center border-b border-gray-300 h-12">
        <Link to={`/products/${formatSlug(item.category)}/${formatSlug(item.title)}/tienda/${item.id}`}>
          <h2 className="text-sm font-bold text-blue-800 capitalize line-clamp-2 leading-tight px-2 overflow-hidden">
            {item.title}
          </h2>
        </Link>
        <Button
          variant="cristal"
          className="px-1"
          onClick={() => clearCart(item)}
        >
          <TrashIcon className="w-4 h-4 text-gray-600 hover:text-blue-600" />
        </Button>
      </div>

      <div className="flex flex-row justify-between mt-0">
        <div className="bg-cyan-50 flex flex-col border border-gray-300 rounded-sm rounded-t-none border-t-0">
          <Link to={`/products/${formatSlug(item.category)}`}>
            <ImgWithSkeleton
              title={item.title}
              image={item.image}
              className={`object-contain p-2`}
              size={`w-30 h-30`}
            />
          </Link>
          <div className="flex flex-col">
            <p className="text-xxs text-gray-500">Unit Price</p>
            <span className="flex px-2 border-t border-b border-gray-300 text-xs justify-center items-center w-30 text-gray-500">
              {formattedUnitPrice}
            </span>
          </div>

          <div>
            <p className="text-xxs text-gray-500">Stock</p>

            <span className="flex px-2 border-t border-gray-300 text-xs justify-center items-center w-30 text-gray-500">
              {item.stock - item.quantity}
            </span>
          </div>
        </div>

        <div className="flex flex-col-reverse justify-center gap-4 items-center">
          <div className="flex flex-col">
            <p className="text-xs text-gray-600">Quantity</p>
            <div className="flex border border-gray-300 rounded-sm text-base justify-between items-center w-40">
              <div className="flex flex-col border border-gray-300 rounded-sm p-1">
                <Button
                  variant="ghost"
                  className="text-xs rounded-xl min-w-4 transition-all"
                  disabled={item.quantity == 1}
                  onClick={() => addToCart(item, -1)}
                >
                  ➖
                </Button>
              </div>
              <Button
                className="text-xl px-2 hover:text-blue-500"
                variant="cristal"
                onClick={() => resetProdQtyCart(item)}
              >
                {getCartQuantity(item)}
              </Button>
              <div className="flex flex-col border border-gray-300 rounded-sm p-1">
                <Button
                  variant="ghost"
                  className="text-xs rounded-xl min-w-4 transition-all"
                  disabled={item.stock - item.quantity == 0}
                  onClick={() => addToCart(item, 1)}
                >
                  ➕
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-xs text-gray-600">Price</p>
            <span className="flex px-2 border border-gray-300 rounded-sm text-xl justify-center items-center w-40">
              {formattedTotalPrice}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
