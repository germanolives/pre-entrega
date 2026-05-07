import { Loading } from "./Loading";
import { ErrorMessage } from "./ErrorMessage";

export const RenderContent = ({ loading, error, data, children }) => {
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  const hasData = Array.isArray(data)
    ? data.length > 0
    : data !== null && data !== undefined;

  return hasData ? children : null;
};
