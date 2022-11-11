import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

type Props = {
  component: ComponentType;
};

export const RequiresAuth = ({ component }: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Redirecting you to the login page...</div>,
  });
  return <Component />;
};
