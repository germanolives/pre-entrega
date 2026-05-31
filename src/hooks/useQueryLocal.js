import { useState, useEffect } from "react";

export const useQueryLocal = (categorySlug = null, titleSlug = null, id = null, source) => {
  const [data, setData] = useState(
    categorySlug && titleSlug && id ? null : categorySlug ? [] : [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (source !== "local") {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    const getData = async () => {
      let result;
      const urlProducts = "/data/products.json";
      try {
        const resProd = await fetch(urlProducts);
        if (!resProd.ok) {
          throw new Error("Producto no disponible");
        }
        const prods = await resProd.json();
        if (categorySlug && titleSlug && id) {
          if (!prods) {
            result = null;
          } else {
            const searchProd = prods.find(
              (item) => String(item.id) === String(id),
            );
            result = searchProd ? searchProd : null;
          }
        } else if (categorySlug && titleSlug == null && id == null) {
          if (!prods) {
            result = [];
          } else {
            const searchProd = prods.filter(
              (item) => item.categorySlug === categorySlug,
            );
            result = searchProd ? searchProd : [];
          }
        } else {
          result = prods || [];
        }
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [categorySlug, titleSlug, id, source]);

  return { data, loading, error };
};