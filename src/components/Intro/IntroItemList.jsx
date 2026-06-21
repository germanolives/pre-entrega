import { Item } from "../Item/Item";

export const IntroItemList = ({ data }) => {

  return (
    <>
      {data.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </>
  );
};
