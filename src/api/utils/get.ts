import { useAuth0 } from "@auth0/auth0-react";
import { Endpoint, Service } from "enums";
import { ky } from "./ky";

export const get = async <
  Params extends Record<string, string | number | boolean>,
  Response
>(
  service: Service,
  endpoint: Endpoint | string,
  params: Params
): Promise<{ result: Response }> => {
  const getOptions = {
    searchParams: params,
    retry: {
      limit: 2,
      statusCodes: [408, 413, 429, 500, 502, 503, 504, 405],
    },
  };
  const baseURL = import.meta.env.VITE_FINANCE_LENS_SERVICE_ADDRESS;
  const port = import.meta.env.VITE_FINANCE_LENS_SERVICE_PORT;

  const url = `${baseURL}:${port}/${service}/${endpoint}`;
  const response = (await ky.get(url, getOptions).json()) as {
    result: Response;
  };

  return response;
};
