import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Button } from "../common/Button";
import { ImgWithSkeleton } from "../common/ImgWithSkeleton";
import { formatSlug } from "../../utils/formatSlug";
import { TrashIcon } from "../Icons/index";

export const CartItem = ({ item }) => {
  const {
    updateCartQuantity,
    clearCart,
    getCartQuantity,
    getCartTotal,
    resetProdQtyCart,
  } = useCart();
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  const currentQuantity = getCartQuantity(item);
  const availableStock = Math.max(0, item.stock - currentQuantity);
  const formattedTotalPrice = countryPrice.format(getCartTotal(item));
  const appliedOffers = item.offers?.find((o) => currentQuantity >= o.qty);
  const discount = appliedOffers ? appliedOffers.discount : 0;
  const unitPriceWithDiscount = item.price - (discount / 100) * item.price;
  const formattedUnitPrice = countryPrice.format(unitPriceWithDiscount);
  const titleSlug = formatSlug(item.title);
  const categorySlug = formatSlug(item.category);
  const productPath = `/products/${categorySlug}/${titleSlug}/${item.id}`;
  const categoryPath = `/products/${categorySlug}`;

  return (
    <article className="flex flex-col bg-cyan-100 border border-gray-200 rounded-xl p-2 shadow-md">
      <div className="flex flex-row justify-between items-center border-b border-gray-300 h-12">
        <Link to={productPath}>
          <h2 className="text-sm font-bold text-blue-800 capitalize line-clamp-2 leading-tight px-2 overflow-hidden">
            {item.title}
          </h2>
        </Link>
        <Button
          variant="cristal"
          className="px-1"
          onClick={() => clearCart(item)}
        >
          <TrashIcon className="w-4 h-4 mb-3 text-gray-600 hover:text-blue-600" />
        </Button>
      </div>
      <div className="flex flex-row justify-evenly mt-0">
        <div className="bg-cyan-50 flex flex-col border border-gray-300 rounded-sm rounded-t-none border-t-0">
          <Link to={categoryPath}>
            <ImgWithSkeleton
              title={item.title}
              image={item.image}
              className="object-contain p-2"
              size="w-30 h-30"
            />
          </Link>
          <div className="flex flex-col">
            <p className="text-xxs text-gray-500 text-center">Unit Price</p>
            <span className="flex px-2 border-t border-b border-gray-300 text-xs justify-center items-center w-30 text-gray-500">
              {formattedUnitPrice}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-xxs text-gray-500 text-center">
              Stock Available
            </p>
            <span className="flex px-2 border-t border-gray-300 text-xs justify-center items-center w-30 text-gray-500">
              {availableStock}{" "}
            </span>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-center gap-4 items-center">
          <div className="flex flex-col">
            <p className="text-xs text-gray-600 text-center mb-1">Quantity</p>
            <div className="flex border border-gray-300 rounded-sm text-base justify-between items-center w-40 bg-white">
              <div className="flex flex-col border-r border-gray-300 p-1">
                <Button
                  variant="ghost"
                  className="text-xs rounded-xl min-w-4 transition-all"
                  disabled={currentQuantity <= 1}
                  onClick={() => updateCartQuantity(item, item.quantity - 1)}
                >
                  ➖
                </Button>
              </div>
              <Button
                className="text-xl px-2 font-bold text-blue-900 hover:text-blue-500"
                variant="cristal"
                onClick={() => resetProdQtyCart(item)}
              >
                {currentQuantity}
              </Button>

              <div className="flex flex-col border-l border-gray-300 p-1">
                <Button
                  variant="ghost"
                  className="text-xs rounded-xl min-w-4 transition-all"
                  disabled={availableStock <= 0}
                  onClick={() => updateCartQuantity(item, item.quantity + 1)}
                >
                  ➕
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-gray-600 text-center mb-1">Price</p>
            <span className="flex px-2 border border-gray-300 rounded-sm text-xl font-bold justify-center items-center w-40 bg-white text-blue-900">
              {formattedTotalPrice}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
