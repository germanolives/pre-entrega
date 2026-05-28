import { Link } from "react-router-dom";
import { formatSlug } from "../../utils/formatSlug";
import { Button } from "../common/Button";
import { FavoriteIcon } from "../Icons/index";
import { useFavorite } from "../../context/FavoriteContext";
import { useCart } from "../../context/CartContext";
import { ImgWithSkeleton } from "../common/ImgWithSkeleton";

export const FavoritesItem = ({ item }) => {
  const { addToCart, getCartQuantity } = useCart();
  const { toggleFavorite, isFavorite } = useFavorite();
  const unitsInCart = getCartQuantity(item);
  const isAdded = unitsInCart > 0;
  const titleSlug = formatSlug(item.title);
  const categorySlug = formatSlug(item.category);
  const productPath = `/products/${categorySlug}/${titleSlug}/${item.id}`;
  const categoryPath = `/products/${categorySlug}`;
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  const formattedPrice = countryPrice.format(item.price);
  const favUndofav = () => {
    toggleFavorite(item);
  };
  const availableStock = Math.max(0, item.stock - unitsInCart);

  const handleAdd = () => {
    if (availableStock > 0) {
      addToCart(item, 1);
    }
  };


  const isOutOfStock = stock === unitsInCart;

  return (
    <article className="grid grid-rows-[auto_auto_1fr_auto] bg-gray-200 p-4 shadow-2xl border border-gray-300 h-full rounded-sm">
      <div className="flex flex-row justify-between">
        <Link to={productPath}>
          <h3 className="text-sm text-black text-left capitalize line-clamp-2 leading-tight px-2 min-h-9 overflow-hidden">
            {item.title}
          </h3>
        </Link>
        <Button
          variant="cristal"
          onClick={favUndofav}
          className={`rounded-sm ${isFavorite(item) ? "opacity-100 hover:opacity-80" : "opacity-20 hover:opacity-40"}`}
        >
          <FavoriteIcon className="w-4 h-4 mb-6 ml-3" />
        </Button>
      </div>

      <Link to={categoryPath}>
        <div className="w-full aspect-square overflow-hidden bg-white border border-gray-100 rounded-sm">
          <ImgWithSkeleton
            image={item.image}
            className="object-contain p-2 transform transition-transform duration-500 ease-in-out hover:scale-105"
            size={"w-full h-full"}
          />
        </div>
      </Link>

      <p className="text-xs text-gray-600 line-clamp-3 my-2">
        {item.description}
      </p>
      <p className="text-xxs text-right font-medium text-gray-700">
        Available Stock: {availableStock} units
      </p>
      <p className="text-xxs text-right font-medium text-blue-700">
        Added to cart: {unitsInCart} units
      </p>
      
      <div className="flex flex-row justify-between mt-auto pt-2">
        <span className="text-xl font-bold text-blue-800 mt-auto">
          {formattedPrice}
        </span>

        <Button
          variant={
            availableStock <= 0 ? "outline" : !isAdded ? "primary" : "tertiary"
          }
          className="px-1 rounded-md w-30 font-semibold transition-colors duration-300"
          onClick={handleAdd}
          disabled={availableStock <= 0}
        >
          {availableStock <= 0
            ? "Out of Stock"
            : !isAdded
              ? "Add to Cart"
              : "Added to Cart"}
        </Button>
      </div>
    </article>
  );
};