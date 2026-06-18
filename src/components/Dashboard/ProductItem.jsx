import { useProducts } from "../../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { EditIcon, TrashIcon } from "../Icons/index";
import { Button } from "../common/Button";
import { ModalBox } from "../common/ModalBox";
import { useAlert } from "../../context/AlertContext";


export const ProductItem = ({ item }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  const formattedPrice = countryPrice.format(item.price);

const { addAlert } = useAlert();

const handleDelete = async () => {
  const result = await deleteProduct(item.id);
  
  if (result.success) {
     addAlert("DELETE_CONFIRMATION");
  } else {
     addAlert("ERROR_GENERIC");
  }
};

  return (
    <div className="grid grid-cols-1  md:grid-cols-[minmax(120px,200px)_minmax(100px,200px)_minmax(100px,200px)_minmax(75px,100px)_minmax(50px,100px)_25px_25px] p-2 bg-cyan-200 border border-gray-300 gap-3 rounded-sm text-xs justify-center">
      <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-center h-6">
        {item.code}
      </span>
      <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-left line-clamp-1 h-6">
        {item.title}
      </span>
      <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-left line-clamp-1 h-6">
        {item.category}
      </span>
      <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-right h-6">
        {formattedPrice}
      </span>
      <span className="bg-cyan-100 border p-1 border-gray-300 rounded-sm text-right h-6">
        {item.stock}
      </span>
      <Button
        variant="cristal"
        className="bg-cyan-100 border border-gray-300 rounded-sm flex items-center justify-center"
        onClick={() => {
          navigate(
            `/dashboard/edit/${item.categorySlug}/${item.titleSlug}/${item.id}`,
          );
        }}
      >
        <EditIcon className="text-green-500  w-4 h-4" />
      </Button>
      <ModalBox
        classNameButton="bg-cyan-100 border border-gray-300 rounded-sm flex items-center justify-center"
        onConfirm={handleDelete}
        operationType="Delete"
      >
        <TrashIcon className="text-red-400 w-4 h-4" />
      </ModalBox>
    </div>
  );
};
