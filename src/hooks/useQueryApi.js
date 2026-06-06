import { useState, useEffect } from "react";
import { formatSlug } from "../utils/formatSlug";
import { addProperties } from "../utils/addProperties";
import { offers } from "../data/offers/offers";
import { stock } from "../data/stock/stock";
import { idToCode } from "../utils/idToCode";

export const useQueryApi = (
  categorySlug = null,
  titleSlug = null,
  id = null,
  source,
) => {
  const [data, setData] = useState(
    categorySlug && titleSlug && id ? null : categorySlug ? [] : [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (source !== "api") {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    const getData = async () => {
      const urlAllProducts = "https://fakestoreapi.com/products";
      const urlOneProduct = `https://fakestoreapi.com/products/${id}`;
      let urlProducts;
      let result;
      if (categorySlug && titleSlug && id) {
        urlProducts = urlOneProduct;
      } else if (titleSlug == null && id == null) {
        urlProducts = urlAllProducts;
      }
      try {
        const resProd = await fetch(urlProducts);
        if (!resProd.ok) {
          throw new Error("Producto no disponible");
        }
        const prods = await resProd.json();
        const realProd = Array.isArray(prods)
          ? prods.map((item) => ({ ...item, id: String(item.id), code: idToCode(String(item.id)) || "" }))
          : { ...prods, id: String(prods.id), code: idToCode(String(prods.id)) || "" };
        const searchOffers = offers.map((item) => ({
          ...item,
          id: String(item.id) || "",
        }));
        if (!realProd) throw new Error("El producto no existe");
        const realOffers = [...searchOffers].sort((a, b) => b.qty - a.qty);

        if (categorySlug && titleSlug && id) {
          const category = formatSlug(realProd.category);
          if (categorySlug !== category) {
            throw new Error("Categoría incorrecta para este producto");
          }
          const productFound = {
            ...realProd,
            titleSlug: formatSlug(realProd.title),
            categorySlug: formatSlug(realProd.category),
            offers: realOffers,
            stock: stock
              ? Number(
                  stock.find((item) => String(item.id) === String(realProd.id))
                    ?.qty ?? 0,
                )
              : 0,
          };
          setData(productFound);
        } else {
          let data;
          if (categorySlug && titleSlug == null && id == null) {
            const prodCateg = realProd.filter(
              (item) => formatSlug(item.category) === categorySlug,
            );
            data = addProperties(prodCateg, realOffers, stock);
          } else {
            data = addProperties(realProd, realOffers, stock);
          }
          setData(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [categorySlug, titleSlug, id, source, reload]);

  const refetch = () => {
    setReload((prev) => !prev);
  };

  return { data, loading, error, refetch };
};
