import { Endpoint, Service } from "enums";
import { Sanitization } from "types";
import { post } from "api/utils/post";

export type UpdateSanitizationBody = Sanitization;

export type UpdateSanitizationResponse = {};

export const updateSanitization = async (
  body: UpdateSanitizationBody
): Promise<UpdateSanitizationResponse> => {
  return await post<UpdateSanitizationBody, UpdateSanitizationResponse>(
    Service.Transaction,
    Endpoint.UpdateSanitization,
    body
  );
};
