import { useQuery } from "react-query";
import { QueryKey } from "enums";
import { listCategories } from "api/transactions/listCategories";

export const useListCategories = () => {
  const queryKey = [QueryKey.ListCategoies];
  return useQuery(queryKey, () => listCategories(), {
    retry: 1,
    keepPreviousData: true,
  });
};
