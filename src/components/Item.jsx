import { useState } from "react";
import { Link } from "react-router-dom";
import { ImgWithSkeleton } from "./common/ImgWithSkeleton";
import { formatSlug } from "../utils/formatSlug";
import { Button } from "./common/Button";

export const Item = ({ id, title, price, description, category, image }) => {
  const [favorite, setFavorite] = useState(false);
  const titleSlug = formatSlug(title);
  const categorySlug = formatSlug(category);
  const favoriteSlug = favorite ? "favorite" : "search";
  const productPath = `/products/${categorySlug}/${titleSlug}/${favoriteSlug}/${id}`;
  const countryPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const formattedPrice = countryPrice.format(price);

  const favUndofav = () => setFavorite(!favorite);

  return (
    <article className="grid grid-rows-[auto_auto_1fr_auto] bg-gray-200 p-4 shadow-2xl border border-gray-300 h-full rounded-sm">
      <Link to={productPath}>
        <h3 className="text-sm text-black text-left capitalize line-clamp-2 leading-tight px-2 min-h-9 overflow-hidden">
          {title}
        </h3>
        <div className="w-full aspect-square overflow-hidden bg-white border border-gray-100 rounded-sm">
          <ImgWithSkeleton
            image={image}
            className="object-contain p-2 transform transition-transform duration-500 ease-in-out hover:scale-105"
            size={"w-full h-full"}
          />
        </div>
      </Link>
      <p className="text-xs text-gray-600 line-clamp-3">{description}</p>
      <div className="flex flex-row justify-between">
        <span className="text-xl font-bold text-blue-800 mt-auto">
          {formattedPrice}
        </span>
        <Button onClick={favUndofav} className={`rounded-sm ${favorite ? "opacity-100 hover:opacity-80" : "opacity-20 hover:opacity-40"}`}>⭐</Button>
      </div>
    </article>
  );
};
