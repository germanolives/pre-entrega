import { useState } from "react";
import { Link } from "react-router-dom";
import { ImgWithSkeleton } from "./common/ImgWithSkeleton";
import { Button } from "./common/Button";
import { DiscountList } from "./Discount/DiscountList";

export const ItemDetail = ({ data }) => {
  const { title, price, description, category, image, offer, rating } = data;
  const [offer10, offer20, offer50, offer100, offer150] = offer;
  const [count, setCount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const discount =
    count >= offer150.qty
      ? offer150.discount
      : count >= offer100.qty
        ? offer100.discount
        : count >= offer50.qty
          ? offer50.discount
          : count >= offer20.qty
            ? offer20.discount
            : count >= offer10.qty
              ? offer10.discount
              : 0;

  const countryPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const formattedPrice = countryPrice.format(price - (discount / 100) * price);

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

  return (
    <div className="flex flex-col md:grid grid-cols-2 w-2/3">
      <article className="grid grid-rows-[auto_1fr_auto_auto] bg-gray-200 p-4 shadow-2xl border border-gray-300 h-full rounded-sm">
        <h1 className="text-xl font-bold text-blue-800 mt-auto capitalize line-clamp-3 leading-tight px-2 min-h-15 overflow-hidden">
          {title}
        </h1>
        <div className="w-full aspect-square overflow-hidden bg-white border border-gray-100 rounded-sm">
          <ImgWithSkeleton
            image={image}
            className="object-contain p-2 transform transition-transform duration-500 ease-in-out hover:scale-105"
            size={"w-full h-full"}
          />
        </div>
        <p className="text-base capitalize  text-gray-800 mt-auto">
          {category}
        </p>
        <p className="text-xs text-gray-600">{description}</p>
      </article>

      <aside className="p-6 shadow-2xl border border-gray-300 flex flex-col justify-between items-center">
        <p className="">Ofertas del día disponibles</p>
        <DiscountList offer={offer} price={price} />
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl font-bold text-blue-800">{formattedPrice}</p>
          <span className="p-2">
            <Button
              onClick={delProduct}
              variant="outline"
              className="px-3 py-1 mx-1"
            >
              ➖
            </Button>
            <Button
              onClick={resetProduct}
              variant={isAdded ? "tertiary" : "primary"}
              disabled={count === 0}
              className={`px-4 py-2 min-w-14 transition-all ${count >= 150 ? "ring-4 ring-cyan-400" : count >= 100 ? "ring-4 ring-fuchsia-400" : count >= 50 ? "ring-4 ring-yellow-300" : count >= 20 ? "ring-4 ring-emerald-400" : count >= 10 ? "ring-4 ring-amber-400" : count === 0 ? "opacity-50" : ""}`}
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
            onClick={changeColor}
            variant={isAdded ? "tertiary" : "primary"}
            disabled={count === 0}
            className={`${count === 0 ? "opacity-50" : ""} ${isAdded ? "px-4" : ""}`}
          >
            {isAdded ? "Agregado" : "Agregar"}
          </Button>
        </div>
      </aside>
    </div>
  );
};
