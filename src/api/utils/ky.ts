import { useAuth0 } from "@auth0/auth0-react";
import _ky from "ky";

export const ky = _ky.create({
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = localStorage.getItem("auth-token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          // TODO redirect to signin
          console.log("User not authorised");
        }
      },
    ],
  },
});
