import { useMutation } from "react-query";

import {
  createAccount,
  CreateAccountResponse,
  CreateAccountBody,
} from "api/account/createAccount";

export const useCreateAccount = () => {
  return useMutation<CreateAccountResponse, null, CreateAccountBody>(
    (variables) => createAccount({ ...variables })
  );
};
