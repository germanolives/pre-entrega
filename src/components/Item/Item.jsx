import { Link } from "react-router-dom";
import { ImgWithSkeleton } from "../common/ImgWithSkeleton";
import { formatSlug } from "../../utils/formatSlug";
import { Button } from "../common/Button";
import { FavoriteIcon } from "../Icons/index";
import { useFavorite } from "../../context/FavoriteContext";

export const Item = ({ item }) => {
  const titleSlug = formatSlug(item.title);
  const categorySlug = formatSlug(item.category);
  const productPath = `/products/${categorySlug}/${titleSlug}/${item.id}`;
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });

  const { toggleFavorite, isFavorite } = useFavorite();
  const formattedPrice = countryPrice.format(item.price);

  const favUndofav = () => {
    toggleFavorite(item);
  };

  return (
    <article className="grid grid-rows-[auto_auto_1fr_auto] bg-gray-200 p-4 shadow-2xl border border-gray-300 h-full rounded-sm gap-2">
      
      <div className="overflow-hidden">
        <div className="flex flex-row justify-between items-start w-full gap-1">
          
          <Link to={productPath} className="grow min-w-0">
            <h3 className="text-sm text-black text-left capitalize line-clamp-2 leading-tight px-1 min-h-9 overflow-hidden">
              {item.title}
            </h3>
          </Link>
          
          <Button
            variant="cristal"
            onClick={favUndofav}
            className={`rounded-sm shrink-0 p-1 transition-opacity duration-300 ${
              isFavorite(item) ? "opacity-100 hover:opacity-80" : "opacity-20 hover:opacity-40"
            }`}
          >
            <FavoriteIcon className="w-4 h-4" />
          </Button>
          
        </div>
      </div>

      <Link to={productPath}>
        <div className="w-full aspect-square overflow-hidden bg-white border border-gray-100 rounded-sm">
          <ImgWithSkeleton
            image={item.image}
            className="object-contain p-2 transform transition-transform duration-500 ease-in-out hover:scale-105"
            size={"w-full h-full"}
          />
        </div>
      </Link>

      <div className="overflow-hidden">
        <p className="text-xs text-gray-600 line-clamp-3">{item.description}</p>
      </div>

      <div className="flex flex-row justify-between pt-1 mt-auto">
        <span className="text-xl font-bold text-blue-800">
          {formattedPrice}
        </span>
      </div>
    </article>
  );
};