import { ProductItem } from "./ProductItem";
import { sortData } from "../../utils/sortData";

export const ProductList = ({ data, select }) => {
  const { name, order } = select;
  const sortedData = sortData(data, name, order);

  return (
    <>
      {sortedData.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </>
  );
};