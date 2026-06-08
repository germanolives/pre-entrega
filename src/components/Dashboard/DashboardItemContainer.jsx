import { useState } from "react";
import { formatSlug } from "../../utils/formatSlug";
import { useProducts } from "../../context/ProductsContext";
import { DashboardItemDetail } from "./DashboardItemDetail";


export const DashboardItemContainer = ({ data }) => {
  const [dataForm, setDataForm] = useState({
    ...data,
    titleSlug: data.titleSlug || formatSlug(data.title),
    categorySlug: data.categorySlug || formatSlug(data.category),
    offers: data.offers || [],
  });
  const { updateProduct } = useProducts();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "title") updated.titleSlug = formatSlug(value);
      if (name === "category") updated.categorySlug = formatSlug(value);
      return updated;
    });
  };

  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    const isValid =
      name === "rate"
        ? value === "" || /^\d*\.?\d*$/.test(value)
        : value === "" || /^[0-9\b]+$/.test(value);
    if (isValid) {
      setDataForm((prev) => ({
        ...prev,
        rating: { ...prev.rating, [name]: value },
      }));
    }
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (value === "" || /^\d*\.?\d*$/.test(value))
      setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStockChange = (e) => {
    const { name, value } = e.target;
    if (value === "" || /^[0-9\b]+$/.test(value))
      setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOfferToggle = (selectedOffer) => {
    setDataForm((prev) => {
      const currentOffers = prev.offers;

      // 🌟 Evaluamos si el producto ya tiene esta oferta comparando los IDs de los objetos
      const exists = currentOffers.some((item) => item.id === selectedOffer.id);

      const updatedOffers = exists
        ? currentOffers.filter((item) => item.id !== selectedOffer.id) // Si está, la sacamos
        : [...currentOffers, selectedOffer]; // Si no está, sumamos el objeto completo

      return {
        ...prev,
        offers: updatedOffers,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "¡Validación exitosa! Guardando datos en el sistema:",
      dataForm,
    );
    updateProduct(dataForm);
  };

  return (
    <DashboardItemDetail
      dataForm={dataForm}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleRatingChange={handleRatingChange}
      handlePriceChange={handlePriceChange}
      handleStockChange={handleStockChange}
      handleOfferToggle={handleOfferToggle}
     />
  );
};
