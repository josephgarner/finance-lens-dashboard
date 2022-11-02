import { get } from "api/utils/get";
import { Endpoint, Service } from "enums";
import { Account } from "types";

export type ListAllAccountsResponse = {
  accounts: Account[];
};

export const listAllAccounts = async (): Promise<ListAllAccountsResponse> => {
  const response = await get<{}, ListAllAccountsResponse>(
    Service.Account,
    Endpoint.ListAllAccounts,
    {}
  );
  return { accounts: response.result.accounts };
};
