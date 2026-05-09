import { ItemDiscount } from "./ItemDiscount";
import { Button } from "../common/Button";

export const DiscountList = ({ offer, price, formattedPrice, message }) => {

  const hideShow = () => {
  
  };

  return (
    <>
      <Button variant="ghost" onClick={hideShow}>{message}</Button>
      <>
        {offer.map((item) => (
          <ItemDiscount
            key={item.id}
            price={price}
            formattedPrice={formattedPrice}
            {...item}
          />
        ))}
      </>
    </>
  );
};
