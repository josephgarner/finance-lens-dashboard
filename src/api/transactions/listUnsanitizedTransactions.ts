import { get } from "api/utils/get";
import { Endpoint, Service } from "enums";
import { Transaction } from "types";

export type ListUnsanitizedTransactionsResponse = {
  transactions: Transaction[];
};

export type ListUnsanitizedTransactionsParams = {
  account: string;
};

export const listUnsanitizedTransactions = async (
  params: ListUnsanitizedTransactionsParams
): Promise<ListUnsanitizedTransactionsResponse> => {
  const endpoint = Endpoint.ListUnsanitizedTransactionsPerAccount.replace(
    ":account",
    params.account || ""
  );
  const response = await get<{}, ListUnsanitizedTransactionsResponse>(
    Service.Transaction,
    endpoint,
    {}
  );
  return { transactions: response.result.transactions };
};
