import ky from "ky";
import { Endpoint, Service } from "enums";

export async function get<
  Params extends Record<string, string | number | boolean>,
  Response
>(
  service: Service,
  endpoint: Endpoint,
  params: Params
): Promise<{ result: Response }> {
  const getOptions = {
    searchParams: params,
  };
  const baseURL = import.meta.env.VITE_FINANCE_LENS_SERVICE_ADDRESS;
  const port = import.meta.env.VITE_FINANCE_LENS_SERVICE_PORT;

  const url = `${baseURL}:${port}/${service}/${endpoint}`;
  const response = (await ky.get(url, getOptions).json()) as {
    result: Response;
  };

  return response;
}
