import { useProducts } from "../../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { EditIcon, TrashIcon } from "../Icons/index";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";

export const ProductItem = ({ item }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  const formattedPrice = countryPrice.format(item.price);

  return (
    <div className="grid grid-cols-1  md:grid-cols-[3fr_5fr_3fr_2fr_2fr_0.75fr_0.75fr] bg-cyan-200 border border-gray-300 p-5 gap-5 rounded-sm">
      <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-center">
        {item.code}
      </span>
      <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-left line-clamp-1">
        {item.title}
      </span>
      <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-left line-clamp-1">
        {item.category}
      </span>
      <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-right">
        {formattedPrice}
      </span>
      <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-right">
        {item.stock}
      </span>
      <Button
        variant="cristal"
        className="bg-cyan-100 border border-gray-300 rounded-sm flex items-center justify-center"
        onClick={()=>{navigate(`/dashboard/${item.categorySlug}/${item.titleSlug}/${item.id}`)}}
      >
        <EditIcon className="text-green-500  w-6 h-6" />
      </Button>
      <Button
        variant="cristal"
        className="bg-cyan-100 border border-gray-300 rounded-sm flex items-center justify-center"
        onClick={()=>deleteProduct(item.id)}
      >
        <TrashIcon className="text-red-400 w-6 h-6" />
      </Button>
    </div>
  );
};
