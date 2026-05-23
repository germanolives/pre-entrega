import { CartItem } from "./CartItem";

export const CartList = ({ data }) => {
  return (
    <ul className="flex flex-col gap-4 md:w-2/5 ">
      {data.map((item) => (
        <li key={item.id} data={data}>
          <CartItem item={item} />
        </li>
      ))}
    </ul>
  );
};
