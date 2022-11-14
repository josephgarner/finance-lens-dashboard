import { InputProps, Select } from "@mantine/core";
import { useFinance } from "context";
import { useState } from "react";

type Props = {
  className?: string;
  props?: InputProps;
};

type SelectType = {
  value: string;
  label: string;
};

export const SubcategorySelect = ({ className, props }: Props) => {
  const { subcategories, appendSubcategories } = useFinance();

  const populateSelect = (options: string[]) => {
    return options.map((option) => {
      return { value: option, label: option };
    });
  };

  const [categoryOptions, setCategoryOptions] = useState<SelectType[]>(
    populateSelect(subcategories.sort())
  );

  return (
    <Select
      className={className}
      label="Subcategory"
      description="The subcategory to which this transaction falls under"
      searchable
      nothingFound="No options"
      data={categoryOptions}
      {...props}
      creatable
      clearable
      getCreateLabel={(query) => `+ Create ${query}`}
      onCreate={(query) => {
        appendSubcategories(query);
        const item = { value: query, label: query };
        setCategoryOptions((current) => [...current, item]);
        return item;
      }}
    />
  );
};
