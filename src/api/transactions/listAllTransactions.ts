import { get } from "api/utils/get";
import { Endpoint, Service } from "enums";
import { Transaction } from "types";

export type UpdateTransactionParams = {
  account: string | null;
};

export type ListAllTransactionsResponse = {
  transactions: Transaction[];
};

export const listAllTransactions = async (
  params: UpdateTransactionParams
): Promise<ListAllTransactionsResponse> => {
  const endpoint = Endpoint.ListAllTransactionsPerAccount.replace(
    ":account",
    params.account || ""
  );
  const response = await get<{}, ListAllTransactionsResponse>(
    Service.Transaction,
    endpoint,
    {}
  );
  return { transactions: response.result.transactions };
};
