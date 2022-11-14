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
  pageNumber: number | string;
};

export const listUnsanitizedTransactions = async (
  params: ListUnsanitizedTransactionsParams
): Promise<ListUnsanitizedTransactionsResponse> => {
  const response = await get<
    ListUnsanitizedTransactionsParams,
    ListUnsanitizedTransactionsResponse
  >(Service.Transaction, Endpoint.ListUnsanitizedTransactionsPerAccount, {
    account: params.account || "",
    pageNumber: params.pageNumber || "",
  });
  return {
    ...response.result,
  };
};
