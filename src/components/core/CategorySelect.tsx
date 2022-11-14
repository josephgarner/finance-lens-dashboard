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

export const CategorySelect = ({ className, props }: Props) => {
  const { categories, appendCategory } = useFinance();

  const populateSelect = (options: string[]) => {
    return options.map((option) => {
      return { value: option, label: option };
    });
  };

  const [categoryOptions, setCategoryOptions] = useState<SelectType[]>(
    populateSelect(categories.sort())
  );

  return (
    <Select
      className={className}
      label="Category"
      description="The category to which this transaction falls under"
      searchable
      nothingFound="No options"
      data={categoryOptions}
      {...props}
      creatable
      clearable
      getCreateLabel={(query) => `+ Create ${query}`}
      onCreate={(query) => {
        appendCategory(query);
        const item = { value: query, label: query };
        setCategoryOptions((current) => [...current, item]);
        return item;
      }}
    />
  );
};
