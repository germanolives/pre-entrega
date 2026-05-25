import { ConfirmPuchaseItem } from "./ConfirmPuchaseItem";

export const ConfirmPurchaseContent = ({data}) => {


  return (
    <div className="w-full md:w-80 sticky top-30 right-8 self-start">
        <ConfirmPuchaseItem data={data} />
    </div>
  );
};
