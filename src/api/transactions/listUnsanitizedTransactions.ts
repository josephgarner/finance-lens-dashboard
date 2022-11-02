import { get } from "api/utils/get";
import { Endpoint, Service } from "enums";
import { Transaction } from "types";

export type ListUnsanitizedTransactionsResponse = {
  transactions: Transaction[];
};

export const listUnsanitizedTransactions =
  async (): Promise<ListUnsanitizedTransactionsResponse> => {
    const response = await get<{}, ListUnsanitizedTransactionsResponse>(
      Service.Transaction,
      Endpoint.ListUnsanitizedTransactions,
      {}
    );
    return { transactions: response.result.transactions };
  };
