import { useQuery } from "react-query";
import { QueryKey } from "enums";
import {
  listUnsanitizedTransactions,
  ListUnsanitizedTransactionsParams,
} from "api/transactions/listUnsanitizedTransactions";

export const uselistUnsanitizedTransactions = ({
  account,
}: ListUnsanitizedTransactionsParams) => {
  const queryKey = [`${QueryKey.ListUnsanitizedTransactions}-${account}`];
  return useQuery(queryKey, () => listUnsanitizedTransactions({ account }), {
    retry: 1,
  });
};
