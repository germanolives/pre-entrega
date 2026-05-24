import { useCart } from "../../context/CartContext";
import { Button } from "../common/Button";

export const ConfirmPuchaseItem = ({ data }) => {
  const { cart, checkCart, getCartTotal, getCartQuantity } = useCart();
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  const formattedTotalPrice = countryPrice.format(getCartTotal());

  return (
    <aside className="bg-green-300 flex flex-col justify-center items-center p-2 border border-gray-200 rounded-xl shadow-md ">
      <h2 className="mb-2">Purchase summary</h2>
      <div className="bg-green-200 flex flex-col justify-center items-center border border-gray-300 rounded-sm border-t-0 mb-3 p-1 w-6/7">
        <div className="flex flex-col">
          <p className="text-xs text-gray-500">Products (Quantity)</p>
          <span className="flex px-2 border-t border-b border-gray-300 text-xl justify-center items-center w-30 text-black">
            {getCartQuantity()}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-500">Total (Price)</p>
          <span className="flex px-2 border-t border-gray-300 text-xl justify-center items-center w-30 text-black">
            {formattedTotalPrice}
          </span>
        </div>
      </div>
      <Button className="px-4 py-2 rounded-xl" variant="primary">
        Proceed to checkout
      </Button>
    </aside>
  );
};
