import { useState, useEffect } from "react";
import { formatSlug } from "../../utils/formatSlug";
import { useInventory } from "../../context/InventoryContext";
import { DashboardItemDetail } from "./DashboardItemDetail";
import { useAlert } from "../../context/AlertContext";
import { Helmet } from "react-helmet-async";

export const DashboardItemContainer = ({ data }) => {
  const [dataForm, setDataForm] = useState({
    ...data,
    titleSlug: data?.titleSlug || formatSlug(data?.title || ""),
    categorySlug: data?.categorySlug || formatSlug(data?.category || ""),
    offers: data?.offers || [],
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const { updateProduct } = useInventory();
  const { addAlert } = useAlert();

  useEffect(() => {
    if (data) {
      setDataForm((prev) => ({
        ...prev,
        ...data,
        offers: data.offers || prev.offers,
      }));
    }
  }, [data]);

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
      const exists = currentOffers.some((item) => item.id === selectedOffer.id);
      const updatedOffers = exists
        ? currentOffers.filter((item) => item.id !== selectedOffer.id)
        : [...currentOffers, selectedOffer];

      return {
        ...prev,
        offers: updatedOffers,
      };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      console.log("Archivo binario listo para ImgBB:", file);
    }
  };

  // 🔒 Función interna para sanitizar y forzar tipos numéricos reales antes de persistir en la BD
  const sanitizeProductData = (rawForm, imageUrl = null) => {
    return {
      ...rawForm,
      price: Number(rawForm.price || 0),
      stock: Number(rawForm.stock || 0),
      rating: {
        rate: Number(rawForm.rating?.rate || 0),
        count: Number(rawForm.rating?.count || 0),
      },
      // Si pasamos una nueva URL de ImgBB la pisa, sino conserva la actual
      image: imageUrl || rawForm.image, 
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🌟 ESCENARIO A: Mantiene la foto actual
      if (!imageFile) {
        if (!dataForm.image) {
          addAlert("SELECT_PRODUCT_IMAGE");
          return;
        }

        console.log("Sincronizando cambios de texto...");
        // 🚀 Aplicamos casteo estricto antes de enviar
        const sanitizedProduct = sanitizeProductData(dataForm);
        
        const res = await updateProduct(sanitizedProduct);
        if (res?.success) addAlert("PRODUCT_UPDATED_SUCCESS");
        return; 
      }

      // 🌟 ESCENARIO B: Subida a ImgBB + Guardado Completo
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

        // 🚀 Aplicamos casteo estricto inyectando la nueva URL
        const sanitizedProductWithImg = sanitizeProductData(dataForm, imgbbData.data.url);

        console.log("Guardando en Firestore:", sanitizedProductWithImg);
        const res = await updateProduct(sanitizedProductWithImg);

        if (res?.success) {
          addAlert("PRODUCT_AND_IMAGE_UPDATED_SUCCESS");
          setImageFile(null); 
        }
      } else {
        addAlert("ERROR_FILE_UPLOAD_IMGBB");
        throw new Error("La API de ImgBB rechazó la subida del archivo.");
      }
    } catch (error) {
      console.error("Error crítico en el proceso de envío:", error);
      addAlert("ERROR_PROCESS_FORM");
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Inventory | Dashboard | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Update product listings, edit prices, and manage stock levels for your electronics and clothing catalog."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <DashboardItemDetail
        dataForm={dataForm}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        hoverRatingChange={handleRatingChange}
        handleRatingChange={handleRatingChange}
        handlePriceChange={handlePriceChange}
        handleStockChange={handleStockChange}
        handleOfferToggle={handleOfferToggle}
        handleImageChange={handleImageChange}
        imagePreview={imagePreview}
      />
    </>
  );
};