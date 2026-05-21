import { useQuery } from "../../hooks/useQuery";
import { RenderContent } from "../common/RenderContent";
import { ConfirmPuchaseItem } from "./ConfirmPuchaseItem";

export const ConfirmPurchaseContent = () => {
  const { data, loading, error } = useQuery();

  return (
    <div>
      <RenderContent loading={loading} error={error} data={data}>
        <ConfirmPuchaseItem data={data} />
      </RenderContent>
    </div>
  );
};
