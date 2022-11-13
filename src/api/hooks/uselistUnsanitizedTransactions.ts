import { useQuery } from "react-query";
import { QueryKey } from "enums";
import {
  listUnsanitizedTransactions,
  ListUnsanitizedTransactionsParams,
} from "api/transactions/listUnsanitizedTransactions";

export const uselistUnsanitizedTransactions = ({
  account,
  pageNumber,
}: ListUnsanitizedTransactionsParams) => {
  const queryKey = [
    `${QueryKey.ListUnsanitizedTransactions}-${account}`,
    pageNumber,
  ];
  return useQuery(
    queryKey,
    () => listUnsanitizedTransactions({ account, pageNumber }),
    {
      retry: 1,
      keepPreviousData: true,
    }
  );
};
