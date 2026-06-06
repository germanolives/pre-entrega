import { Link } from "react-router-dom";


export const ProductItem = ({item}) => {
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  const formattedPrice = countryPrice.format(item.price);
  return (
    <Link className="p-5 gap-5 grid grid-cols-[3fr_5fr_3fr_2fr_2fr] bg-cyan-200 border border-gray-300 rounded-sm">
        <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-center">{item.code}</span>
        <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-left line-clamp-1">{item.title}</span>
        <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-left line-clamp-1">{item.category}</span>
        <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-right">{formattedPrice}</span>
        <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-right">{item.stock}</span>     
    </Link>
  );
};