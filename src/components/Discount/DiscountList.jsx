import { ItemDiscount } from "./ItemDiscount";

export const DiscountList = ({ offer, price, formattedPrice }) => {
  return (
    <>
      {offer.map((item) => (
        <ItemDiscount key={item.id} price={price} formattedPrice={formattedPrice} {...item} />
      ))}
    </>
  );
};
