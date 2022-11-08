import {
  listAllTransactions,
  UpdateTransactionParams,
} from "api/transactions/listAllTransactions";
import { useQuery } from "react-query";
import { QueryKey } from "enums";

export const useListAllTransactions = ({
  account,
}: UpdateTransactionParams) => {
  const queryKey = [`${QueryKey.ListAllTransactions}-${account}`];
  return useQuery(queryKey, () => listAllTransactions({ account }), {
    retry: 1,
  });
};
