import { useAuth0 } from "@auth0/auth0-react";
import {
  ActionIcon,
  Button,
  createStyles,
  Divider,
  Group,
  Navbar,
  Title,
} from "@mantine/core";
import { Link } from "components";
import { Paths } from "enums";
import {
  TbArrowsLeftRight,
  TbWallet,
  TbClipboardList,
  TbUser,
  TbEye,
  TbEyeOff,
} from "react-icons/tb";
import { RiCoinLine } from "react-icons/ri";
import { useFinance } from "context";

export const CoreNavbar = () => {
  const { classes } = useStyles();

  const { togglePrivacyMode, privacyMode } = useFinance();

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <Navbar width={{ base: 250 }} p="md">
      <Navbar.Section className={classes.header}>
        <Group className={classes.titleGroup}>
          <RiCoinLine size={24} />
          <Title order={2}>Lakshmi</Title>
        </Group>
        <Divider />
      </Navbar.Section>
      <Navbar.Section grow>
        <Group className={classes.navItemGroup}>
          <Divider />
          <Button<typeof Link>
            fullWidth
            component={Link}
            to={Paths.Transactions}
            leftIcon={<TbArrowsLeftRight size={20} />}
            variant="white"
          >
            Transactions
          </Button>
          <Button<typeof Link>
            fullWidth
            component={Link}
            to={Paths.SanitizeTransactions}
            leftIcon={<TbClipboardList size={20} />}
            variant="white"
          >
            Matching List
          </Button>
          <Divider />
          <Button<typeof Link>
            fullWidth
            component={Link}
            to={Paths.Accounts}
            leftIcon={<TbWallet size={20} />}
            variant="white"
          >
            Accounts
          </Button>
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group position="center">
          <ActionIcon
            // className={classes.action}
            size="xl"
            radius="lg"
            onClick={() => togglePrivacyMode()}
          >
            {privacyMode ? <TbEyeOff size={28} /> : <TbEye size={28} />}
          </ActionIcon>
          {isAuthenticated && (
            <Button
              fullWidth
              leftIcon={<TbUser size={14} />}
              variant="light"
              onClick={() => logoutWithRedirect()}
            >
              Log Out
            </Button>
          )}
          {!isAuthenticated && (
            <Button
              fullWidth
              leftIcon={<TbUser size={14} />}
              variant="light"
              onClick={() => loginWithRedirect({})}
            >
              Login
            </Button>
          )}
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
