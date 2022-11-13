import { get } from "api/utils/get";
import { Endpoint, Service } from "enums";
import { Transaction } from "types";

export type UpdateTransactionParams = {
  account: string;
  pageNumber: number;
};

export type ListAllTransactionsResponse = {
  totalPages: number;
  pageNumber: number;
  transactions: Transaction[];
};

export const listAllTransactions = async (
  params: UpdateTransactionParams
): Promise<ListAllTransactionsResponse> => {
  let endpoint = Endpoint.ListAllTransactionsPerAccount.replace(
    ":account",
    params.account || ""
  );
  endpoint = endpoint.replace(":pageNumber", `${params.pageNumber}` || "");
  const response = await get<{}, ListAllTransactionsResponse>(
    Service.Transaction,
    endpoint,
    {}
  );
  return {
    ...response.result,
  };
};
