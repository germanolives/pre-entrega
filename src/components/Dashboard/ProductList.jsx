import { ProductItem } from "./ProductItem";
import { sortData } from "../../utils/sortData";
import { ClientPagination } from "../common/ClientPagination";

export const ProductList = ({ data, select }) => {
  const { name, order } = select;
  const sortedData = sortData(data, name, order);

  return (
    <ClientPagination searchedProds={sortedData} itemsPerPage={5}>
      {(paginatedProds) => (
        <>
          {paginatedProds.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))}
        </>
      )}
    </ClientPagination>
  );
};
