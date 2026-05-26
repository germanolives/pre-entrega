import { Link } from "react-router-dom";
import { FavoriteIcon } from "../Icons/index";


export const EmptyFavorites = () => {
  return (
    <article className="bg-cyan-100 border border-gray-400 rounded-xl flex flex-col items-center md:flex-row p-4">
      <FavoriteIcon className="w-16 h-16 mx-3 text-gray-300" />
      <div className="mx-2 text-center md:text-left">
        <h4 className="text-xl font-semibold">Favorite's List is empty</h4>
        <p className="italic text-gray-500">
          Add products and get free shipping
        </p>
      </div>
      <div className="flex mx-8 items-center mt-3 md:mt-0">
        <Link to={"/products"} className="text-blue-500 font-semibold hover:text-blue-400">Explore our exclusive catalog</Link>
        
      </div>
    </article>
  );
};
