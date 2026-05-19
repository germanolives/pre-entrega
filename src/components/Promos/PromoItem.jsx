import { Link } from "react-router-dom";
import { ImgWithSkeleton } from "../common/ImgWithSkeleton";
import { formatSlug } from "../../utils/formatSlug";
import { offerLogo } from "../../data/offers/offerLogo";

export const PromoItem = ({ id, title, price, description, category, image, promo }) => {
  const titleSlug = formatSlug(title);
  const categorySlug = formatSlug(category);
  const productPath = `/products/${categorySlug}/${titleSlug}/tienda/${id}`;
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });

  const returnDiscount = (promo.discount/(100-promo.discount))*100;
  const prevPrice = price + (price*returnDiscount/100);
  const formattedPrice = countryPrice.format(price);
  const formattedPrevPrice = countryPrice.format(prevPrice);


  return (
    <article className="grid grid-rows-[auto_auto_1fr_auto] bg-gray-200 p-4 shadow-2xl border border-gray-300 h-full rounded-sm">
      <Link to={productPath}>
        <h3 className="text-sm text-black text-left capitalize line-clamp-2 leading-tight px-2 min-h-9 overflow-hidden">
          {title}
        </h3>
        <div className="w-full aspect-square flex justify-center items-center overflow-hidden bg-white border border-gray-100 rounded-sm p-2">
          <ImgWithSkeleton
            image={image}
            className="max-w-full max-h-full object-contain transform transition-transform duration-500 ease-in-out hover:scale-105"
            size={"w-full h-full"}
          />
        </div>
      </Link>
      <div className="flex flex-wrap justify-between mt-1">
        <p className="text-xs text-gray-600 line-clamp-3">{promo.description}</p>
        <div>
          <p className="text-base line-through mr-2 font-bold text-blue-800 mt-auto">
            {formattedPrevPrice}
          </p>
          <p className="text-4xl font-bold text-blue-800 mt-auto">
            {formattedPrice}
          </p>
        </div>
        <img
          className="rounded-xl  w-15 h-auto"
          src={offerLogo.image}
          alt={offerLogo.title}
        />
      </div>
    </article>
  );
};
