export const addProperties = (data, plusData) => {
  const dataRich = Array.isArray(data)
    ? data.map((item) => ({ ...item, ["offer"]: plusData }))
    : [{ ...data, ["offer"]: plusData }];
  return dataRich;
};
