import { Endpoint, Service } from "enums";
import { Transaction } from "types";
import { post } from "api/utils/post";

export type UploadTransactionRecordBody = FormData;

export type UploadTransactionRecordResponse = {};

export const uploadTransactionRecord = async (
  body: UploadTransactionRecordBody
): Promise<UploadTransactionRecordResponse> => {
  console.log(body);
  return await post<
    UploadTransactionRecordBody,
    UploadTransactionRecordResponse
  >(Service.Transaction, Endpoint.UploadTransactionRecord, body);
};
