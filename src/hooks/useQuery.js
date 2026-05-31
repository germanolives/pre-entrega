import { useQueryDb } from "./useQueryDb";
import { useQueryLocal } from "./useQueryLocal";
import { useQueryApi } from "./useQueryApi";
import { useSource } from "../context/SourceContext";

export const useQuery = (categorySlug = null, titleSlug = null, id = null) => {
  const { source } = useSource();

  const dbResult = useQueryDb(
    categorySlug,
    titleSlug,
    id,
    source,
  );
  const localResult = useQueryLocal(categorySlug, titleSlug, id, source);
  const apiResult = useQueryApi(categorySlug, titleSlug, id, source);

  if (source === "local") {
    return localResult;
  } else if (source === "api") {
    return apiResult;
  } else {
    return dbResult;
  }
};
