import ky from "ky";
import { Endpoint, Service } from "enums";

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

  const url = `${baseURL}:${port}/${service}/${endpoint}`;
  const response = (await ky.post(url, postOptions).json()) as {
    result: Response;
  };
  return response;
}
