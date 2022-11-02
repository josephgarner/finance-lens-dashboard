import { Endpoint, Service } from "enums";
import { Transaction } from "types";
import { post } from "api/utils/post";

export type UpdateTransactionBody = Transaction;

export type UpdateTransactionResponse = {};

export const updateTransaction = async (
  body: UpdateTransactionBody
): Promise<UpdateTransactionResponse> => {
  return await post<UpdateTransactionBody, UpdateTransactionResponse>(
    Service.Transaction,
    Endpoint.UpdateTransaction,
    body
  );
};
