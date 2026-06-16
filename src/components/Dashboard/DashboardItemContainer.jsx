import { useState } from "react";
import { formatSlug } from "../../utils/formatSlug";
import { useProducts } from "../../context/ProductsContext";
import { DashboardItemDetail } from "./DashboardItemDetail";
import { ModalBox } from "../common/ModalBox";

export const DashboardItemContainer = ({ data }) => {
  const [dataForm, setDataForm] = useState({
    ...data,
    titleSlug: data.titleSlug || formatSlug(data.title),
    categorySlug: data.categorySlug || formatSlug(data.category),
    offers: data.offers || [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
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

  // 2. El manejador captura el objeto binario completo
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      console.log("Archivo binario listo para ImgBB:", file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🌟 ESCENARIO A: El usuario NO eligió ninguna foto nueva en el input
      if (!imageFile) {
        if (!dataForm.image) {
          // Si no tiene imagen previa ni nueva, es un error
          alert("Por favor, selecciona una imagen para el producto.");
          return;
        }

        console.log(
          "Sincronizando cambios de texto (mantiene la imagen actual)...",
        );
        const res = await updateProduct(dataForm);
        if (res?.success) alert("¡Producto modificado con éxito!");
        return; // Frenamos la ejecución acá de forma segura
      }

      // 🌟 ESCENARIO B: El usuario SÍ seleccionó una foto nueva (Para crear o reemplazar)
      console.log("Detectado archivo nuevo. Iniciando subida a ImgBB...");

      const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbResp = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const imgbbData = await imgbbResp.json();

      if (imgbbData.success) {
        console.log("Imagen subida con éxito. URL:", imgbbData.data.url);

        // Armamos el objeto final pisando la propiedad 'image'
        const finalProduct = {
          ...dataForm,
          image: imgbbData.data.url,
        };

        console.log(
          "Guardando producto completo con nueva URL en Firestore:",
          finalProduct,
        );
        const res = await updateProduct(finalProduct);

        if (res?.success) {
          alert("¡Producto e imagen guardados con éxito!");
          setImageFile(null); // Limpiamos el binario para futuros envíos
        }
      } else {
        throw new Error("La API de ImgBB rechazó la subida del archivo.");
      }
    } catch (error) {
      console.error("Error crítico en el proceso de envío:", error);
      alert("Hubo un fallo al intentar procesar el formulario.");
    }
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
      handleImageChange={handleImageChange}
      imagePreview={imagePreview}
    />
  );
};
