import { useState } from "react";
import { useProducts } from "../../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { EditIcon, TrashIcon } from "../Icons/index";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";


export const ProductItem = ({ item }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteProduct } = useProducts();
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  const formattedPrice = countryPrice.format(item.price);

  // const handleDeleteConfirm = async () => {
  //   const res = await deleteProduct(item.id);
  //   if (res?.success) {
  //     setIsModalOpen(false); // Cerramos el modal de inmediato
  //   }
  // };


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
      <Button
        variant="cristal"
        className="bg-cyan-100 border border-gray-300 rounded-sm flex items-center justify-center"
        onClick={() => deleteProduct(item.id)}
      >
        <TrashIcon className="text-red-400 w-4 h-4" />
      </Button>
      {/* <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="flex flex-col gap-4">
          <p className="leading-relaxed">
            Are you sure you want to permanently delete this product?{" "}
            <span className="font-bold text-gray-900">"{item.title}"</span>?
            This action cannot be undone in Firestore.
          </p>

          <div className="flex justify-end gap-2 mt-2">
            <Button
            variant="primary"
              className="py-1.5 px-3 rounded-sm uppercase font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
            variant="tertiary"
              className="py-1.5 px-3 rounded-sm uppercase font-bold"
              onClick={handleDeleteConfirm}
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      </Modal> */}
    </div>
  );
};
