import { useState } from "react";
import { Link } from "react-router-dom";
import { ImgWithSkeleton } from "../common/ImgWithSkeleton";
import { Button } from "../common/Button";
import { DiscountList } from "../Discount/DiscountList";
import { formatSlug } from "../../utils/formatSlug";
import { useCart } from "../../context/CartContext";
import { FavoriteIcon } from "../Icons/index";
import { useFavorite } from "../../context/FavoriteContext";

export const ItemDetail = ({ data }) => {
  const {
    title,
    price,
    description,
    category,
    image,
    offer,
    stock,
  } = data;

  const { isFavorite, toggleFavorite } = useFavorite();
  const [count, setCount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const appliedOffer = offer.find((o) => count >= o.qty);
  const discount = appliedOffer ? appliedOffer.discount : 0;
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  const finalPrice = price - (discount / 100) * price;
  const formattedPrice = countryPrice.format(finalPrice);
  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => prev - 1);
  const addProduct = () => {
    setIsAdded(false);
    increase();
  };
  const delProduct = () => {
    setIsAdded(false);
    count > 0 && decrease();
  };
  const resetProduct = () => {
    setCount(0);
    setIsAdded(false);
  };
  const changeColor = () => {
    if (count > 0) {
      setIsAdded(true);
    }
  };
  const { cart, addToCart } = useCart();
  const handleAdd = () => {
    changeColor();
    addToCart(data, count);
  };

const favUndofav = () => {
    toggleFavorite(data);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-2/3 mx-auto">
      <article className="grid grid-rows-[auto_1fr_auto_auto] bg-gray-200 p-4 shadow-2xl border border-gray-300 h-full rounded-sm">
        <div className="flex flax-row justify-between">
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
        <p className="text-base capitalize  text-gray-800 mt-auto">
          {category}
        </p>
        <p className="text-xs text-gray-600">{description}</p>
      </article>

      <aside className="p-6 shadow-2xl border border-gray-300 flex flex-col justify-between items-center">
        <DiscountList
          message={"Today's deals available"}
          offer={offer}
          price={price}
        />
        <p className="text-xxs">Available Stock: {stock} units</p>
        <div className="flex flex-col justify-center items-center">
          <p
            className={`text-4xl font-bold ${isAdded ? "text-red-500" : " text-blue-900"}`}
          >
            {formattedPrice}
          </p>
          <span className="p-2">
            <Button
              onClick={delProduct}
              variant="outline"
              className="px-3 py-1 mx-1 border-0"
            >
              ➖
            </Button>
            <Button
              onClick={resetProduct}
              variant={isAdded ? "tertiary" : "primary"}
              disabled={count === 0}
              className={`px-4 py-2 rounded-xl min-w-14 transition-all ${count >= 150 ? "ring-4 ring-cyan-400" : count >= 100 ? "ring-4 ring-fuchsia-400" : count >= 50 ? "ring-4 ring-yellow-300" : count >= 20 ? "ring-4 ring-emerald-400" : count >= 10 ? "ring-4 ring-amber-400" : ""}`}
            >
              {count}
            </Button>
            <Button
              onClick={addProduct}
              variant="outline"
              className="px-3 py-1 mx-1"
            >
              ➕
            </Button>
          </span>
          <Button
            onClick={handleAdd}
            variant={isAdded ? "tertiary" : "primary"}
            disabled={count > stock || count === 0}
            className={`rounded-xl w-48 py-2`}
          >
            {isAdded ? "Added to cart" : "Add to cart"}
          </Button>
        </div>
      </aside>
    </div>
  );
};























// const [cart, setCart] = useState([]);

// const addToCart = () => {
//   changeColor();
//   const operId = (userId = 1) => {
//     const timestamp = Date.now();
//     const random = Math.floor(Math.random() * 1000);

//     return `TRX-${userId}-${id}-${timestamp}-${random}-${count}`;
//   };

//   setCart([
//     ...cart,
//     {
//       cartId: operId(),
//       prodId: id,
//       prodTitle: title,
//       prodImg: image,
//       prodQty: count,
//       prodPrice: finalPrice,
//       userId: 1,
//     },
//   ]);
// };

// console.log(cart);
