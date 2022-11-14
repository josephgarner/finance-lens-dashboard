import { Endpoint, Service } from "enums";
import { Transaction } from "types";
import { post } from "api/utils/post";

export type UpdateTransactionParams = {
  account: string;
};

export type RunSanitizationResponse = {};

export const runSanitization = async (
  params: UpdateTransactionParams
): Promise<RunSanitizationResponse> => {
  return await post<RunSanitizationResponse, RunSanitizationResponse>(
    Service.Transaction,
    Endpoint.RunSanitization,
    { account: params.account }
  );
};
