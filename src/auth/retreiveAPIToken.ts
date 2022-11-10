import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const retreiveAPIToken = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  const fetchToken = () => {
    const fetch = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        console.log(token);
        localStorage.setItem("auth-token", token);
        setToken(token);
      } else {
        localStorage.removeItem("auth-token");
        setToken(token);
      }
    };
    fetch();
  };

  return { token, fetchToken };
};
