import { PromoItem } from "./PromoItem";

export const PromoList = ({ data, promo }) => {
  return (
    <>
      {data.map((item) => (
        <PromoItem key={item.id} {...item} promo={promo} />
      ))}
    </>
  );
};
