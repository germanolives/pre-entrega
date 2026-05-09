export const ItemDiscount = ({ title, qty, discount, price }) => {
  const countryPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  const formattedPrice = countryPrice.format(price);
  const formattedPriceWithDiscount = countryPrice.format(price - (discount / 100) * price);

  return (
    <div className="flex flex-col p-2 rounded-sm border-0">
      <p className="italic  text-blue-800">{title}</p>
      <p className="text-xxs">Llevando {qty} o más productos como este tiene un descuento del {discount} % y paga {formattedPriceWithDiscount} en lugar de {formattedPrice} por cada uno.</p>
    </div>
  );
};
