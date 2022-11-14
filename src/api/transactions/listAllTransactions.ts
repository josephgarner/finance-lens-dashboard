import { get } from "api/utils/get";
import { Endpoint, Service } from "enums";
import { Transaction } from "types";

export type ListAllTransactionsParams = {
  account: string;
  pageNumber: string | number;
};

export type ListAllTransactionsResponse = {
  totalPages: number;
  pageNumber: number;
  transactions: Transaction[];
};

export const listAllTransactions = async (
  params: ListAllTransactionsParams
): Promise<ListAllTransactionsResponse> => {
  const response = await get<
    ListAllTransactionsParams,
    ListAllTransactionsResponse
  >(Service.Transaction, Endpoint.ListAllTransactionsPerAccount, {
    account: params.account || "",
    pageNumber: params.pageNumber || "",
  });
  return {
    ...response.result,
  };
};
