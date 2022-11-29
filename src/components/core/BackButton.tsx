import { Anchor, Group, ThemeIcon, Text, createStyles } from "@mantine/core";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { Link } from "./Link";

type BreadcrumbProps = {
  route: string;
  label: string;
  isDark?: boolean;
  className?: string;
};

export const BackButton = (props: BreadcrumbProps) => {
  const { classes, cx } = useStyles();
  return (
    <Anchor component={Link} to={props.route} underline={false}>
      <Group
        className={cx(classes.breadcrumbs, props.className, {
          [classes.dark]: props.isDark,
        })}
      >
        <ThemeIcon className={classes.breadcrumbIconContainer}>
          <TbArrowNarrowLeft className={classes.breadcrumbIcon} />
        </ThemeIcon>
        <Text>{props.label}</Text>
      </Group>
    </Anchor>
  );
};

const useStyles = createStyles((theme) => ({
  breadcrumbs: {
    marginBottom: theme.spacing.md,
    alignItems: "center",
    color: theme.black,
    gap: theme.spacing.sm,
  },
  breadcrumbIconContainer: {
    width: theme.spacing.md,
    height: theme.spacing.md,
    borderRadius: theme.radius.xl,
  },
  breadcrumbIcon: {
    fontSize: theme.spacing.sm,
  },
  dark: {
    color: theme.white,
  },
}));
