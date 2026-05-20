import { CartItem } from "./CartItem";

export const CartList = ({ data }) => {
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id} data={data}>
          <CartItem item={item} />
        </li>
      ))}
    </ul>
  );
};
