export const addProperties = (data, plusData) => {
  const dataRich = data.map((item) => ({ ...item, ["offer"]: plusData }));
  return dataRich;
};