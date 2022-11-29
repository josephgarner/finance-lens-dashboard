import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audidience = import.meta.env.VITE_AUTH0_AUDIENCE;
  const scope = import.meta.env.VITE_AUTH0_SCOPE;

  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audidience}
      scope={scope}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};
