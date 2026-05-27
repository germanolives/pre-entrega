import { useState, useEffect } from "react";
import { formatSlug } from "../utils/formatSlug";
import { addProperties } from "../utils/addProperties";
import { offers } from "../data/offers/offers";
import { stock } from "../data/stock/stock";

export const useQuery = (categorySlug = null, titleSlug = null, id = null) => {
  const [data, setData] = useState(categorySlug && titleSlug && id ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const getData = async () => {
      const api = false;
      const urlProductsJson = "/data/products.json";
      const urlAllProductsApi = "https://fakestoreapi.com/products";
      const urlOneProductApi = `https://fakestoreapi.com/products/${id}`;
      const urlProducts = !api
        ? urlProductsJson
        : id
          ? urlOneProductApi
          : urlAllProductsApi;

      try {
        const resProd = await fetch(urlProducts);
        if (!resProd.ok) {
          throw new Error("Producto no disponible");
        }
        const prods = await resProd.json();
        const realProd = Array.isArray(prods)
          ? prods.map((item) => ({ ...item, id: String(item.id) || "" }))
          : { ...prods, id: String(prods.id) ||"" };
        const searchOffers = offers.map((item) => ({
          ...item,
          id: String(item.id) ||"",
        }));
        const sortedOffers = [...searchOffers].sort((a, b) => b.qty - a.qty);
        const realOffers = sortedOffers;

        if (categorySlug && titleSlug && id) {
          const realProductFound = Array.isArray(realProd)
            ? realProd.find((item) => String(item.id) === String(id))
            : realProd;

          if (!realProductFound) throw new Error("El producto no existe");
          const categoryInJson = formatSlug(realProductFound.category);
          if (categorySlug !== categoryInJson) {
            throw new Error("Categoría incorrecta para este producto");
          }
          const productFound = {
            ...realProductFound,
            offers: realOffers,
            stock: stock
              ? Number(
                  stock.find((item) => String(item.id) === String(realProductFound.id))?.qty ??
                    0,
                )
              : 0,
          };
          setData(productFound);
        } else {
          const data = addProperties(realProd, realOffers, stock);
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
