import { Link } from "react-router-dom";
import { ImgWithSkeleton } from "../common/ImgWithSkeleton";
import { formatSlug } from "../../utils/formatSlug";
import { offerLogo } from "../../data/offers/offerLogo";
import { useFavorite } from "../../context/FavoriteContext";
import { FavoriteIcon } from "../Icons/index";
import { Button } from "../common/Button";

export const PromoItem = ({ item, promo }) => {
  const titleSlug = formatSlug(item.title);
  const categorySlug = formatSlug(item.category);
  const categoryPath = `/products/${categorySlug}`;
  const productPath = `/products/${categorySlug}/${titleSlug}/${item.id}`;
  
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });

  const { isFavorite, toggleFavorite } = useFavorite();

  // 🔒 Sanitización de tipos numéricos al inicio
  const numPrice = Number(item.price);
  const numPromoDiscount = Number(promo.discount);

  // 🚀 Aritmética matemática pura y aislada de strings
  const returnDiscount = (numPromoDiscount / (100 - numPromoDiscount)) * 100;
  const prevPrice = numPrice + (numPrice * returnDiscount) / 100;

  const formattedPrice = countryPrice.format(numPrice);
  const formattedPrevPrice = countryPrice.format(prevPrice);

  const favUndofav = () => {
    toggleFavorite(item);
  };

  return (
    <article className="grid grid-rows-[auto_auto_1fr_auto] bg-gray-200 p-4 shadow-2xl border border-gray-300 h-full rounded-sm">
      <div className="w-full aspect-35/9 overflow-hidden">
        <div className=" overflow-hidden">
          <div className="flex flex-row justify-between items-start w-full gap-1">
            <Link to={productPath} className="grow min-w-0">
              <h3 className="text-sm text-black text-left capitalize line-clamp-2 leading-tight px-2 min-h-9 overflow-hidden">
                {item.title}
              </h3>
            </Link>
            <Button
              variant="cristal"
              onClick={favUndofav}
              className={`rounded-sm shrink-0 items-start ${isFavorite(item) ? "opacity-100 hover:opacity-80" : "opacity-20 hover:opacity-40"}`}
            >
              <FavoriteIcon className="w-6 h-6 mb-9 ml-3" />
            </Button>
          </div>
        </div>
      </div>
      
      <Link to={categoryPath}>
        <div className="w-full aspect-square flex justify-center items-center overflow-hidden bg-white border border-gray-100 rounded-sm p-2">
          <ImgWithSkeleton
            image={item.image}
            className="max-w-full max-h-full object-contain transform transition-transform duration-500 ease-in-out hover:scale-105"
            size={"w-full h-full"}
          />
        </div>
      </Link>

      <div className="flex flex-wrap justify-between mt-1">
        <p className="text-xs text-gray-600 line-clamp-3">
          {promo.description}
        </p>
        <div>
          <div className=" overflow-hidden">
            <p className="text-base line-through mr-2 font-bold text-blue-800 mt-auto">
              {formattedPrevPrice}
            </p>
          </div>
          <p className="text-4xl font-bold text-blue-800 mt-auto w-35">
            {formattedPrice}
          </p>
        </div>
        <img
          className="rounded-xl w-15 h-auto"
          src={offerLogo.image}
          alt={offerLogo.title}
        />
      </div>
    </article>
  );
};