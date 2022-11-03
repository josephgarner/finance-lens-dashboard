import { useQuery } from "react-query";
import { QueryKey } from "enums";
import { listAllSanitizing } from "api/transactions/listAllSanitizing";

export const useListAllSanitizing = () => {
  const queryKey = [QueryKey.ListAllSanitizing];
  return useQuery(queryKey, () => listAllSanitizing(), {
    staleTime: 120000,
    retry: 1,
  });
};
