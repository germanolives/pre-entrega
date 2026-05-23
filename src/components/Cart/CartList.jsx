import { CartItem } from "./CartItem";

export const CartList = ({ data }) => {
  return (
    <ul className="flex flex-col md:w-2/5 gap-4 ">
      {data.map((item) => (
        <li key={item.id} data={data}>
          <CartItem item={item} />
        </li>
      ))}
    </ul>
  );
};
