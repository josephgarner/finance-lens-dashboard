import {
  listAllTransactions,
  UpdateTransactionParams,
} from "api/transactions/listAllTransactions";
import { useQuery } from "react-query";
import { QueryKey } from "enums";

export const useListAllTransactions = ({
  account,
  pageNumber,
}: UpdateTransactionParams) => {
  const queryKey = [`${QueryKey.ListAllTransactions}-${account}`, pageNumber];
  return useQuery(
    queryKey,
    () => listAllTransactions({ account, pageNumber }),
    {
      retry: 1,
      keepPreviousData: true,
    }
  );
};
