import { Item } from "./Item";

export const ItemList = ({ data }) => {
  const sortedData = [...data].sort((a, b) => {
  const categ = a.category.localeCompare(b.category);

  if (categ !== 0) {
    return categ; 
  }
  return a.title.localeCompare(b.title);
});
  return (
    <>
      {sortedData.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </>
  );
};
