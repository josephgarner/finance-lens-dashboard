import { useMutation } from "react-query";

import {
  uploadTransactionRecord,
  UploadTransactionRecordBody,
  UploadTransactionRecordResponse,
} from "api/transactions/uploadTransactionRecord";

export const useUploadTransactionRecord = () => {
  return useMutation<
    UploadTransactionRecordResponse,
    null,
    UploadTransactionRecordBody
  >((variables) => uploadTransactionRecord(variables));
};
