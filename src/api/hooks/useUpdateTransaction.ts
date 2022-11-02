import { useMutation } from "react-query";

import {
  updateTransaction,
  UpdateTransactionBody,
  UpdateTransactionResponse,
} from "api/transactions/updateTransaction";

export const useUpdateTransaction = () => {
  return useMutation<UpdateTransactionResponse, null, UpdateTransactionBody>(
    (variables) => updateTransaction({ ...variables })
  );
};
