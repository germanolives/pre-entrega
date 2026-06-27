import { useState } from "react";
import { formatSlug } from "../utils/formatSlug";
import { useInventory } from "../context/InventoryContext";
import { DashboardItemDetail } from "../components/Dashboard/DashboardItemDetail";
import { useAlert } from "../context/AlertContext";
import { Helmet } from "react-helmet-async";

export const DashboardNewItemContainer = () => {
  const { addProduct } = useInventory();
  const [imageFile, setImageFile] = useState(null);
  const { addAlert } = useAlert();
  const [imagePreview, setImagePreview] = useState("");

  // 🔒 Inicializamos el formulario con tipos consistentes desde el nacimiento
  const createInitialState = () => ({
    id: crypto.randomUUID(),
    code: "",
    title: "",
    titleSlug: "",
    price: "",
    description: "",
    category: "",
    categorySlug: "",
    image: "",
    rating: {
      rate: 0,   // 🚀 Inicializado como Number puro
      count: 0,  // 🚀 Inicializado como Number puro
    },
    offers: [],
    stock: "",
  });

  const [dataForm, setDataForm] = useState(createInitialState);

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
      console.log("Binary file ready for ImgBB:", file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      addAlert("SELECT_PRODUCT_IMAGE");
      return;
    }

    try {
      console.log("Subiendo imagen del nuevo producto a ImgBB...");
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

        const finalProduct = {
          ...dataForm,
          image: imgbbData.data.url,
        };

        console.log("Guardando nuevo registro en Firestore:", finalProduct);

        // 🛡️ El contexto intercepta acá y fuerza el casteo de price, stock y ratings
        const res = await addProduct(finalProduct);

        if (res?.success) {
          addAlert("PRODUCT_CREATED_SUCCESS");

          setImageFile(null);
          setImagePreview("");
          setDataForm(createInitialState()); // 🚀 Reseteo limpio usando la función constructora
        }
      } else {
        throw new Error("La API de ImgBB rechazó la subida del archivo.");
      }
    } catch (error) {
      console.error("Error crítico en el proceso de alta:", error);
      addAlert("ERROR_CREATE_PRODUCT");
    }
  };

  return (
    <section
      className="mx-4 md:mx-15 border-2 border-gray-300 rounded-xl p-8 flex justify-center items-center"
    >
      <Helmet>
        <title>Add New Product | Inventory | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Add new items to the catalog. Define product details, pricing, and stock levels for inventory management."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <DashboardItemDetail
        dataForm={dataForm}
        imagePreview={imagePreview}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleRatingChange={handleRatingChange}
        handlePriceChange={handlePriceChange}
        handleStockChange={handleStockChange}
        handleOfferToggle={handleOfferToggle}
        handleImageChange={handleImageChange}
      />
    </section>
  );
};