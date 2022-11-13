import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, createStyles, Title } from "@mantine/core";
import { getToken } from "auth";
import { Paths } from "enums";
import { useEffect } from "react";
import { TbUser } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { loginWithRedirect } = useAuth0();
  const { classes } = useStyles();

  return (
    <Container className={classes.container}>
      <Title className={classes.bigTitle}>{"{Alpha}"}</Title>
      <Title>Lakshmi</Title>
      <Button
        size="xl"
        leftIcon={<TbUser size={14} />}
        variant="light"
        onClick={() => loginWithRedirect({})}
      >
        Login
      </Button>
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "> *": {
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
  },
  bigTitle: {
    fontSize: 180,
  },
}));
