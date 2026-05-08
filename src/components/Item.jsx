import { Link } from "react-router-dom";
import { ImgWithSkeleton } from "./common/ImgWithSkeleton";

export const Item = ({ id, title, price, description, category, image }) => {
  const shortTitle = title.toLowerCase().split(" ").slice(0, 4).join(" ");
  const slug = shortTitle
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quita acentos
    .replace(/[^a-z0-9 ]/g, "") // Quita símbolos (deja letras, números y espacios)
    .replace(/\s+/g, "-") // Cambia espacios por guiones
    .replace(/-+/g, "-"); // Colapsa guiones múltiples en uno solo
  const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
  const productPath = `/products/${categorySlug}/${slug}/${id}`;

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
      <p className="text-xl font-bold text-blue-800 mt-auto">${price}</p>
    </article>
  );
};
