import { Endpoint, Service } from "enums";
import { Sanitization } from "types";
import { post } from "api/utils/post";

export type AddSanitizingBody = Sanitization;

export type AddSanitizingResponse = {};

export const addSanitizing = async (
  body: AddSanitizingBody
): Promise<AddSanitizingResponse> => {
  return await post<AddSanitizingBody, AddSanitizingResponse>(
    Service.Transaction,
    Endpoint.AddSanitizing,
    body
  );
};
