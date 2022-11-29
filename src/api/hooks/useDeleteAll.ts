import {
  deleteAll,
  DeleteAllBody,
  DeleteAllResponse,
} from "api/core/deleteAll";
import { useMutation } from "react-query";

export const useDeleteAll = () => {
  return useMutation<DeleteAllResponse, null, DeleteAllBody>(() => deleteAll());
};
