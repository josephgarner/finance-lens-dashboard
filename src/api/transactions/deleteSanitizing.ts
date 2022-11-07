import { Endpoint, Service } from "enums";
import { Sanitization } from "types";
import { post } from "api/utils/post";

export type DeleteSanitizingBody = {
  id: string;
};

export type DeleteSanitizingResponse = {};

export const deleteSanitizing = async (
  body: DeleteSanitizingBody
): Promise<DeleteSanitizingResponse> => {
  return await post<DeleteSanitizingBody, DeleteSanitizingResponse>(
    Service.Transaction,
    Endpoint.DeleteSanitizing,
    body
  );
};
