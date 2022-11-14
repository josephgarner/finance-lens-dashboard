import { Endpoint, Service } from "enums";
import { ky } from "./ky";

type JSONSerializable =
  | string
  | number
  | boolean
  | Date
  | null
  | { [key: string | number]: JSONSerializable }
  | Array<JSONSerializable>;

export async function post<Body extends JSONSerializable | FormData, Response>(
  service: Service,
  endpoint: Endpoint | string,
  body: Body
): Promise<{ result: Response }> {
  const postOptions =
    body instanceof FormData
      ? {
          body: body,
        }
      : {
          json: body,
        };

  const baseURL = import.meta.env.VITE_FINANCE_LENS_SERVICE_ADDRESS;
  const port = import.meta.env.VITE_FINANCE_LENS_SERVICE_PORT;
  const enviroment = import.meta.env.VITE_ENV;

  const url =
    enviroment === "production"
      ? `${baseURL}/v1/${service}/${endpoint}`
      : `${baseURL}:${port}/v1/${service}/${endpoint}`;

  const response = (await ky.post(url, postOptions).json()) as {
    result: Response;
  };
  return response;
}
