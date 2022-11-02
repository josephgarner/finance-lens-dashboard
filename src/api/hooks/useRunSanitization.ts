import { useMutation } from "react-query";

import {
  runSanitization,
  RunSanitizationResponse,
  UpdateTransactionParams,
} from "api/transactions/runSanitization";

export const useRunSanitization = () => {
  return useMutation<RunSanitizationResponse, null, UpdateTransactionParams>(
    (variables) => runSanitization({ ...variables })
  );
};
