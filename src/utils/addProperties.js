export const addProperties = (data, plusData, stock) => {
  const dataRich = Array.isArray(data)
    ? data.map((item) => ({
        ...item,
        offers: plusData,
        stock: stock
          ? Number(stock.find((s) => s.id === item.id)?.qty ?? 0)
          : 0,
      }))
    : [
        {
          ...data,
          offers: plusData,
          stock: stock
            ? Number(stock.find((s) => s.id === data.id)?.qty ?? 0)
            : 0,
        },
      ];
  return dataRich;
};
