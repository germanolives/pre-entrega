import { formatSlug } from "./formatSlug";

export const addProperties = (data, plusData, stock) => {
  const dataRich = data.map((item) => ({
    ...item,
    titleSlug: formatSlug(item.title),
    categorySlug: formatSlug(item.category),
    offers: plusData,
    stock: stock
      ? Number(stock.find((s) => String(s.id) === String(item.id))?.qty ?? 0)
      : 0,
  }));
  return dataRich;
};
