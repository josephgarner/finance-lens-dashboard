import { useQuery } from "react-query";
import { QueryKey } from "enums";
import { listUnsanitizedTransactions } from "api/transactions/listUnsanitizedTransactions";

export const uselistUnsanitizedTransactions = () => {
  const queryKey = [QueryKey.ListUnsanitizedTransactions];
  return useQuery(queryKey, () => listUnsanitizedTransactions(), {
    staleTime: 120000,
  });
};
