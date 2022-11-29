export {};

import * as jwt from "jsonwebtoken";
import "cypress-file-upload";
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import "@testing-library/cypress/add-commands";

Cypress.Commands.add("login", () => {
  Cypress.log({
    name: "loginViaAuth0",
  });

  const audience = Cypress.env("auth_audience");
  const client_id = Cypress.env("auth_client_id");

  const options = {
    method: "POST",
    url: Cypress.env("auth_url"),
    body: {
      grant_type: "password",
      username: Cypress.env("auth_username"),
      password: Cypress.env("auth_password"),
      audience: audience,
      scope: "openid profile email",
      client_id: client_id,
      client_secret: Cypress.env("auth_client_secret"),
    },
  };
  cy.request(options).then(({ body }) => {
    const claims: any = jwt.decode(body.id_token);
    const {
      nickname,
      name,
      picture,
      updated_at,
      email,
      email_verified,
      sub,
      exp,
    } = claims;

    const item = {
      body: {
        ...body,
        decodedToken: {
          claims,
          user: {
            nickname,
            name,
            picture,
            updated_at,
            email,
            email_verified,
            sub,
          },
          audience,
          client_id,
        },
      },
      expiresAt: exp,
    };
    window.localStorage.setItem(
      "@@auth0spajs@@::zDGOLLplfB9UNzRmB73kWGAf4AGxXxmN::Finance-Service-API-Local::openid profile email read:current_user update:current_user_metadata",
      JSON.stringify(item)
    );
  });
  cy.visit("/");
});
