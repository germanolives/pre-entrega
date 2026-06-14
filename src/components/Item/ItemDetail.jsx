import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ImgWithSkeleton } from "../common/ImgWithSkeleton";
import { Button } from "../common/Button";
import { DiscountList } from "../Discount/DiscountList";
import { formatSlug } from "../../utils/formatSlug";
import { useCart } from "../../context/CartContext";
import { FavoriteIcon } from "../Icons/index";
import { useFavorite } from "../../context/FavoriteContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ItemDetail = ({ data }) => {
  const { title, price, description, category, image, offers, stock } = data;
  const { user } = useAuth();
  const currentUser = user ? user.uid : null;
  const navigate = useNavigate();
  const { getCartQuantity, addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorite();
  const [count, setCount] = useState(0);
  const unitsInCart = getCartQuantity(data);
  const showAsAdded = unitsInCart > 0 && count === 0;
  const availableStock = Math.max(0, stock - unitsInCart - count);
  const appliedoffers = offers.find((o) => unitsInCart + count >= o.qty);
  const discount = appliedoffers ? appliedoffers.discount : 0;
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  const finalPrice = price - (discount / 100) * price;
  const formattedPrice = countryPrice.format(finalPrice);
  const addProduct = () => {
    if (stock - unitsInCart - count > 0) setCount((prev) => prev + 1);
  };
  const delProduct = () => {
    if (count > 0) setCount((prev) => prev - 1);
  };
  const resetProduct = () => setCount(0);
  const handleAdd = () => {
    if (!currentUser) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (count > 0 && count <= stock - unitsInCart) {
      addToCart(data, count);
      setCount(0);
    }
  };
  const favUndofav = () => {
    toggleFavorite(data);
  };
  const isOutOfStock = stock === unitsInCart;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-2/3 mx-auto">
      <article className="grid grid-rows-[auto_1fr_auto_auto] bg-gray-200 p-4 shadow-2xl border border-gray-300 h-full rounded-sm">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-bold text-blue-800 mt-auto capitalize line-clamp-3 leading-tight px-2 min-h-15 overflow-hidden">
            {title}
          </h1>
          <Button
            variant="cristal"
            onClick={favUndofav}
            className={`rounded-sm items-start ${isFavorite(data) ? "opacity-100 hover:opacity-80" : "opacity-20 hover:opacity-40"}`}
          >
            <FavoriteIcon className="w-6 h-6 mb-9" />
          </Button>
        </div>
        <Link to={`/products/${formatSlug(category)}`}>
          <div className="w-full aspect-square overflow-hidden bg-white border border-gray-100 rounded-sm">
            <ImgWithSkeleton
              image={image}
              className="object-contain p-2 transform transition-transform duration-500 ease-in-out hover:scale-105"
              size={"w-full h-full"}
            />
          </div>
        </Link>
        <p className="text-base capitalize text-gray-800 mt-auto">{category}</p>
        <p className="text-xs text-gray-600">{description}</p>
      </article>

      <aside className="p-6 shadow-2xl border border-gray-300 flex flex-col justify-between items-center">
        <DiscountList
          message={"Today's deals available"}
          offers={offers}
          price={price}
        />
        <div className="text-center my-2">
          <p className={`text-xxs font medium text-blue-700`}>
            Available Stock: {availableStock} units
          </p>
          <p
            className={`text-xxs font-medium ${!showAsAdded ? "text-blue-700" : "text-red-700"}`}
          >
            Added to cart: {unitsInCart} units
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p
            className={`text-4xl font-bold transition-colors duration-300 ${showAsAdded ? "text-red-500" : "text-blue-900"}`}
          >
            {formattedPrice}
          </p>

          <span className="p-2">
            <Button
              onClick={delProduct}
              variant="outline"
              disabled={count === 0}
              className="px-3 py-1 mx-1 border-0"
            >
              ➖
            </Button>
            <Button
              onClick={resetProduct}
              variant={showAsAdded ? "tertiary" : "primary"}
              disabled={count === 0}
              className={`px-4 py-2 rounded-xl min-w-14`}
            >
              {count}
            </Button>
            <Button
              onClick={addProduct}
              variant="outline"
              disabled={availableStock <= 0}
              className="px-3 py-1 mx-1"
            >
              ➕
            </Button>
          </span>

          <Button
            onClick={handleAdd}
            variant={
              isOutOfStock ? "outline" : showAsAdded ? "tertiary" : "primary"
            }
            disabled={count === 0 || isOutOfStock}
            className="rounded-xl w-48 py-2 font-semibold transition-all duration-300"
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </aside>
    </div>
  );
};
