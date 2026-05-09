import { useState } from "react";
import { ItemDiscount } from "./ItemDiscount";
import { Button } from "../common/Button";

export const DiscountList = ({ offer, price, formattedPrice, message }) => {
  const [show, setShow] = useState(false);
  const hideShow = () => setShow(!show);

  return (
    <>
      <Button variant="outline" className="px-2 border border-gray-300 rounded-xl md:hidden" onClick={hideShow}>
        {message}
      </Button>
      <p className="hidden md:block font-bold text-gray-600">{message}</p>
      <div className={`${!show ? "hidden" : "block"} md:block`}>
        {offer.map((item) => (
          <ItemDiscount
            key={item.id}
            price={price}
            formattedPrice={formattedPrice}
            {...item}
          />
        ))}
      </div>
    </>
  );
};
