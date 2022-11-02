import { get } from "api/utils/get";
import { Endpoint, Service } from "enums";
import { Transaction } from "types";

export type ListAllTransactionsResponse = {
  transactions: Transaction[];
};

export const listAllTransactions =
  async (): Promise<ListAllTransactionsResponse> => {
    const response = await get<{}, ListAllTransactionsResponse>(
      Service.Transaction,
      Endpoint.ListAllTransactions,
      {}
    );
    return { transactions: response.result.transactions };
  };
