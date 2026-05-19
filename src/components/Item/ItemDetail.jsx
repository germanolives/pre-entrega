import { useState } from "react";
import { Link } from "react-router-dom";
import { ImgWithSkeleton } from "../common/ImgWithSkeleton";
import { Button } from "../common/Button";
import { DiscountList } from "../Discount/DiscountList";
import { formatSlug } from "../../utils/formatSlug";
import { useCart } from "../../context/CartContext";

export const ItemDetail = ({ data, favorite }) => {
  const {
    title,
    price: priceRaw,
    description,
    category,
    image,
    offer: offerRaw,
  } = data;

  const price = Number(priceRaw) || 0;
  const offer = offerRaw.map((item) => ({ ...item, id: Number(item.id) || 0 }));
  const flagFav = favorite === "favorite" ? true : false;
  const [count, setCount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const sortedOffers = [...offer].sort((a, b) => b.qty - a.qty);
  const appliedOffer = sortedOffers.find((o) => count >= o.qty);
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

  console.log("Contenido del carrito global:", cart);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-2/3 mx-auto">
      <article className="grid grid-rows-[auto_1fr_auto_auto] bg-gray-200 p-4 shadow-2xl border border-gray-300 h-full rounded-sm">
        <div className="flex flax-row justify-between">
          <h1 className="text-xl font-bold text-blue-800 mt-auto capitalize line-clamp-3 leading-tight px-2 min-h-15 overflow-hidden">
            {title}
          </h1>
          <span
            className={`${flagFav ? "bg-blue-800 h-7 rounded-sm" : "hidden"}`}
          >
            ⭐
          </span>
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
            disabled={count === 0}
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
