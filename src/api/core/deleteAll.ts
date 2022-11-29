import { post } from "api/utils/post";
import { Endpoint, Service } from "enums";

export type DeleteAllBody = {};

export type DeleteAllResponse = {};

export const deleteAll = async (): Promise<DeleteAllResponse> => {
  return await post<DeleteAllBody, DeleteAllResponse>(
    Service.Core,
    Endpoint.DeleteAll,
    {}
  );
};
