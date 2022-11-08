import { post } from "api/utils/post";
import { Endpoint, Service } from "enums";
import { Account } from "types";

export type CreateAccountResponse = {
  account: Account;
};

export type CreateAccountBody = Account;

export const createAccount = async (
  body: CreateAccountBody
): Promise<CreateAccountResponse> => {
  const response = await post<CreateAccountBody, CreateAccountResponse>(
    Service.Account,
    Endpoint.CreateAccount,
    body
  );
  return { account: response.result.account };
};
