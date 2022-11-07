import {
  deleteSanitizing,
  DeleteSanitizingBody,
  DeleteSanitizingResponse,
} from "api/transactions/deleteSanitizing";
import { useMutation } from "react-query";

export const useDeleteSanitizing = () => {
  return useMutation<DeleteSanitizingResponse, null, DeleteSanitizingBody>(
    (variables) => deleteSanitizing({ ...variables })
  );
};
