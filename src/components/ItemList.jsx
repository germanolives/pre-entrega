import { Item } from "./Item";

export const ItemList = ({data}) => {
  return (
    <>
      {data.map((item) => (
        // <Item key={item.id} title={item.title} image={item.image} price={item.price}/>
        <Item key={item.id} {...item} />
      ))}
    </>
  );
};
