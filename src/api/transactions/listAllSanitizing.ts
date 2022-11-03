import { get } from "api/utils/get";
import { Endpoint, Service } from "enums";
import { Sanitization } from "types";

export type ListAllSanitizingResponse = {
  sanitization: Sanitization[];
};

export const listAllSanitizing =
  async (): Promise<ListAllSanitizingResponse> => {
    const response = await get<{}, ListAllSanitizingResponse>(
      Service.Transaction,
      Endpoint.ListAllSanitizing,
      {}
    );
    return { sanitization: response.result.sanitization };
  };
