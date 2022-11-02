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
  const endpoint = Endpoint.RunSanitization.replace(":account", params.account);
  return await post<{}, RunSanitizationResponse>(
    Service.Transaction,
    endpoint,
    {}
  );
};
