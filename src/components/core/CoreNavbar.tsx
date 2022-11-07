import {
  Button,
  createStyles,
  Divider,
  Group,
  Navbar,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Link } from "components";
import { Paths } from "enums";
import {
  TbZoomMoney,
  TbArrowsLeftRight,
  TbWallet,
  TbClipboardList,
} from "react-icons/tb";

export const CoreNavbar = () => {
  const { classes } = useStyles();
  return (
    <Navbar width={{ base: 250 }} p="md">
      <Navbar.Section className={classes.header}>
        <Group className={classes.titleGroup}>
          <TbZoomMoney size={24} />
          <Title order={3}>Finance Lens</Title>
        </Group>
        <Divider />
      </Navbar.Section>
      <Navbar.Section grow>
        <Group className={classes.navItemGroup}>
          <Divider />
          <Button<typeof Link>
            component={Link}
            to={Paths.Transactions}
            leftIcon={<TbArrowsLeftRight size={20} />}
            variant="white"
            color="indigo"
          >
            Transactions
          </Button>
          <Button<typeof Link>
            component={Link}
            to={Paths.SanitizeTransactions}
            leftIcon={<TbClipboardList size={20} />}
            variant="white"
            color="indigo"
          >
            Matching List
          </Button>
          <Divider />
          <Button<typeof Link>
            component={Link}
            to={Paths.Accounts}
            leftIcon={<TbWallet size={20} />}
            variant="white"
            color="indigo"
          >
            Accounts
          </Button>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

const useStyles = createStyles((theme) => ({
  header: {
    marginBottom: theme.spacing.xl,
  },
  titleGroup: {
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },
  navItemGroup: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
}));
