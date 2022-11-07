import { createStyles, Group, Title, Text } from "@mantine/core";

type Props = {
  month: string;
  count: number;
};

export const MonthRow = ({ month, count }: Props) => {
  const { classes } = useStyles();

  return (
    <Group className={classes.group}>
      <Title order={3}>{month}</Title>
      <Text color="gray">{count} transactions</Text>
    </Group>
  );
};

const useStyles = createStyles((theme) => ({
  group: {
    paddingLeft: theme.spacing.md,
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
}));
