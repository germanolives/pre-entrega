export const addProperties = (data, plusData, stock) => {
  const dataRich = Array.isArray(data)
    ? data.map((item) => ({
        ...item,
        offers: plusData,
        stock: stock
          ? Number(stock.find((s) => String(s.id) === String(item.id))?.qty ?? 0)
          : 0,
      }))
    : [
        {
          ...data,
          offers: plusData,
          stock: stock
            ? Number(stock.find((s) => String(s.id) === String(data.id))?.qty ?? 0)
            : 0,
        },
      ];
  return dataRich;
};
