import {
  addSanitizing,
  AddSanitizingBody,
  AddSanitizingResponse,
} from "api/transactions/addSanitizing";
import { useMutation } from "react-query";

export const useAddSanitizing = () => {
  return useMutation<AddSanitizingResponse, null, AddSanitizingBody>(
    (variables) => addSanitizing({ ...variables })
  );
};
