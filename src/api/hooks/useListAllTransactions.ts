import { listAllTransactions } from "api/transactions/listAllTransactions";
import { useQuery } from "react-query";
import { QueryKey } from "enums";

export const useListAllTransactions = () => {
  const queryKey = [QueryKey.ListAllTransactions];
  return useQuery(queryKey, () => listAllTransactions());
};
