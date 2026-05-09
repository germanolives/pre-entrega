import { Item } from "./Item";

export const ItemList = ({data}) => {
  return (
    <>
      {data.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </>
  );
};
