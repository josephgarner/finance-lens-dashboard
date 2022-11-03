import { createStyles, Group, Title } from "@mantine/core";

type Props = {
  month: string;
};

export const MonthRow = ({ month }: Props) => {
  const { classes } = useStyles();

  return (
    <Group className={classes.group}>
      <Title order={3}>{month}</Title>
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
