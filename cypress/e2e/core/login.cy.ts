export {};

describe("[AUTH]: user sign in", () => {
  it("the user can login with valid credentials", () => {
    cy.login().wait(500);

    cy.findAllByTestId("delete-all-data-button").click();

    cy.findAllByTestId("upload-transaction-button");
  });
});
