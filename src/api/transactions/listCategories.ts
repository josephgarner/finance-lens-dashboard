import { get } from "api/utils/get";
import { Endpoint, Service } from "enums";

export type ListCategoriesParams = {};

export type ListCategoriesResponse = {
  categories: string[];
  subcategories: string[];
};

export const listCategories = async (): Promise<ListCategoriesResponse> => {
  const response = await get<ListCategoriesParams, ListCategoriesResponse>(
    Service.Transaction,
    Endpoint.ListCategoies,
    {}
  );
  return {
    ...response.result,
  };
};
