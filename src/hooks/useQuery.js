import { useState, useEffect } from "react";
import { formatSlug } from "../utils/formatSlug";
import { addProperties } from "../utils/addProperties";

export const useQuery = (
  categorySlug = null,
  titleSlug = null,
  id = null,
) => {
  const [data, setData] = useState(categorySlug && titleSlug && id ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const getData = async () => {
      const api = false;
      const urlProductsJson = "/data/products.json";
      const urlOffersJson = "/data/offers.json";
      const urlAllProductsApi = "https://fakestoreapi.com/products";
      const urlOneProductApi = `https://fakestoreapi.com/products/${id}`;
      const urlProducts = !api ? urlProductsJson : id ? urlOneProductApi : urlAllProductsApi;

      try {
        const [resProd, resOffer] = await Promise.all([
          fetch(urlProducts),
          fetch(urlOffersJson),
        ]);

        if (!resProd.ok) {
          throw new Error("Producto no disponible");
        }
        if (!resOffer.ok) {
          throw new Error("Ofertas no disponibles");
        }

        const realProd = await resProd.json();
        const realOffer = await resOffer.json();

        if (categorySlug && titleSlug && id) {

          const realProductFound = !api ? realProd.find((item) => item.id === parseInt(id)) : realProd; 

          if (!realProductFound) throw new Error("El producto no existe");
          const categoryInJson = formatSlug(realProductFound.category);
          if (categorySlug !== categoryInJson) {
            throw new Error("Categoría incorrecta para este producto");
          }
          const productFound = { ...realProductFound, offer: realOffer };
          setData(productFound);
        } else {
          const data = addProperties(realProd, realOffer);
          setData(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [categorySlug, titleSlug, id]);

  return { data, loading, error };
};
