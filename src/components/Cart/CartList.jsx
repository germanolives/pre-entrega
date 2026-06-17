import { CartItem } from "./CartItem";

export const CartList = ({ data }) => {
  return (
    <ul className="flex flex-col md:w-full gap-4 justify-center">
      {data.map((item) => (
        <li key={item.id} data={data}>
          <CartItem item={item} />
        </li>
      ))}
    </ul>
  );
};
