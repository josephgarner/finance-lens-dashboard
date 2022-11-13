import { get } from "api/utils/get";
import { Endpoint, Service } from "enums";
import { Transaction } from "types";

export type ListUnsanitizedTransactionsResponse = {
  totalPages: number;
  pageNumber: number;
  transactions: Transaction[];
};

export type ListUnsanitizedTransactionsParams = {
  account: string;
  pageNumber: number;
};

export const listUnsanitizedTransactions = async (
  params: ListUnsanitizedTransactionsParams
): Promise<ListUnsanitizedTransactionsResponse> => {
  let endpoint = Endpoint.ListUnsanitizedTransactionsPerAccount.replace(
    ":account",
    params.account || ""
  );
  endpoint = endpoint.replace(":pageNumber", `${params.pageNumber}` || "");
  const response = await get<{}, ListUnsanitizedTransactionsResponse>(
    Service.Transaction,
    endpoint,
    {}
  );
  return {
    ...response.result,
  };
};
