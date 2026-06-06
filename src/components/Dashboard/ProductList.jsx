import { ProductItem } from "./ProductItem";

export const ProductList = ({ data, select }) => {
  const { name, order } = select;

  const sortedData = [...data].sort((a, b) => {
    let A = a[name] ?? "";
    let B = b[name] ?? "";

    let compare = 0;

    if (name === "price" || name === "stock") {
      compare = Number(A) - Number(B);
    } 
    else {
      compare = String(A).localeCompare(String(B));
    }
    return order ? compare : compare * -1;
  });

  return (
    <>
      {sortedData.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </>
  );
};