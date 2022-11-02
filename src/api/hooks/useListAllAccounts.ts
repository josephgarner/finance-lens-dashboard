import { useQuery } from "react-query";
import { QueryKey } from "enums";
import { listAllAccounts } from "api/account/listAllAccounts";

export const useListAllAccounts = () => {
  const queryKey = [QueryKey.ListAllAccounts];
  return useQuery(queryKey, () => listAllAccounts());
};
