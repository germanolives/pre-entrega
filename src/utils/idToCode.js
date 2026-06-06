import { codes } from "../data/codes/codes";

export const idToCode = (data) => {
  if (data !== null && Array.isArray(codes)) {
    const search = codes.find((item) => String(item.id) === String(data));
    return search ? search.code : "";
  }
  return "";
};
