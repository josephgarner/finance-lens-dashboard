import {
  updateSanitization,
  UpdateSanitizationBody,
  UpdateSanitizationResponse,
} from "api/transactions/updateSanitization";
import { useMutation } from "react-query";

export const useUpdateSanitization = () => {
  return useMutation<UpdateSanitizationResponse, null, UpdateSanitizationBody>(
    (variables) => updateSanitization({ ...variables })
  );
};
