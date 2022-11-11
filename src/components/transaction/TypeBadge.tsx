import { Badge } from "@mantine/core";
import { TransactionType } from "enums";

type Props = {
  type: TransactionType;
};

export const TypeBadge = ({ type }: Props) => {
  switch (type) {
    case TransactionType.EXPENSE:
      return <Badge color="red">{type}</Badge>;
    case TransactionType.INCOME:
      return <Badge color="green">{type}</Badge>;
    case TransactionType.TRANSFER:
      return <Badge color="yellow">{type}</Badge>;
  }
};
