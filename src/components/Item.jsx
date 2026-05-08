import { Link } from "react-router-dom";
import { ImgWithSkeleton } from "./common/ImgWithSkeleton";

export const Item = ({ id, title, image, price, description }) => {
  return (
    <article className="grid grid-rows-[auto_auto_1fr_auto] bg-gray-200 p-4 shadow-2xl border border-gray-300 h-full rounded-sm">
      <h3 className="text-sm text-black text-left capitalize line-clamp-2 leading-tight px-2 min-h-9 overflow-hidden">
        {title}
      </h3>
      <Link to={`/products/${id}`}>
        <div className="w-full aspect-square overflow-hidden bg-white border border-gray-100 rounded-sm">
          <ImgWithSkeleton
            image={image}
            className="object-contain p-2 transform transition-transform duration-500 ease-in-out hover:scale-105"
            size={"w-full h-full"}
          />
        </div>
      </Link>
      <p className="text-xs text-gray-600 line-clamp-3">{description}</p>
      <p className="text-xl font-bold text-blue-800 mt-auto">${price}</p>
    </article>
  );
};