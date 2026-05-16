export const ItemDiscount = ({ title, qty, discount, price }) => {
  const countryPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  const formattedPrice = countryPrice.format(price);
  const formattedPriceWithDiscount = countryPrice.format(price - (discount / 100) * price);

  return (
    <div className="flex flex-col p-2 rounded-sm border-0">
      <p className="italic  text-blue-800">{title}</p>
      <p className="text-xxs">Buying {qty} or more products like this gives you a {discount}% discount and you pay {formattedPriceWithDiscount} instead of {formattedPrice} for each one.</p>
    </div>
  );
};
