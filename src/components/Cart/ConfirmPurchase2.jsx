import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useQuery } from "../../hooks/useQuery";
import { RenderContent } from "../common/RenderContent";
import { Button } from "../common/Button";
import { TrashIcon } from "../Icons/index";
import { Link } from "react-router-dom";

export const ConfirmPurchase2 = () => {
  const { data, loading, error } = useQuery();
  const [checkOut, setCheckOut] = useState(false);
  const { clearCart, getCartTotal, getCartQuantity } = useCart();
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  const formattedTotalPrice = countryPrice.format(getCartTotal());
    useEffect(() => {
    if (data && !loading && data.length > 0) {
      checkCart(data);
    }
  }, [data, loading]);

  const checkOutOn = () => {
    setCheckOut((prev) => !prev);

    if (data && !loading && data.length > 0) {
      checkCart(data);
    }
  };

  return (
    <RenderContent data={data} loading={loading} error={error}>
      <div className="bg-green-300 flex flex-col justify-center items-center p-2 border border-gray-200 rounded-xl shadow-md ">
        <div className="flex flex-row justify-between w-11/12 mb-2">
          <h2 className="">Purchase summary</h2>
          <Button
            variant="cristal"
            className="px-1"
            onClick={() => clearCart()}
          >
            <TrashIcon className="w-6 h-6 text-gray-600 hover:text-blue-600" />
          </Button>
        </div>
        <div className="bg-green-200 flex flex-col justify-center items-center border border-gray-300 rounded-sm border-t-0 mb-3 p-1 w-11/12">
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
        <Button
          className="px-4 py-2 rounded-xl"
          variant="primary"
          onClick={checkOutOn}
        >
          <Link>Proceed to checkout</Link>
        </Button>
      </div>
    </RenderContent>
  );
};
