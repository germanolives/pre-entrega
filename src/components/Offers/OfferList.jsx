import { OfferItem } from "./OfferItem";

export const OfferList = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <OfferItem key={item.id} {...item} />
      ))}
    </>
  );
};
