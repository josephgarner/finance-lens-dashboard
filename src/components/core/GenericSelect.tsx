import { InputProps, Select } from "@mantine/core";

type Props = {
  className?: string;
  props?: InputProps;
  data: string[];
  label: string;
  description: string;
  withAsterisk: boolean;
};

export const GenericSelect = ({
  className,
  props,
  data,
  label,
  description,
  withAsterisk = false,
}: Props) => {
  const populateSelect = (options: string[]) => {
    return options.map((option) => {
      return { value: option, label: option };
    });
  };

  return (
    <Select
      className={className}
      label={label}
      description={description}
      searchable
      withAsterisk={withAsterisk}
      nothingFound="No options"
      data={populateSelect(data.sort())}
      {...props}
    />
  );
};
