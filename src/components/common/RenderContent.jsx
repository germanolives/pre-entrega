import { Spinner } from "./Spinner";
import { ErrorMessage } from "./ErrorMessage";

export const RenderContent = ({ loading, error, data, children }) => {
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  const hasData = Array.isArray(data)
    ? data.length > 0
    : data !== null && data !== undefined;

  return hasData ? children : null;
};
