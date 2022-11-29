export {};

describe("[Account]: create account", () => {
  it("the user can login with valid credentials", () => {
    cy.login();

    cy.findByText("Accounts").click();
    cy.findAllByTestId("create-account-button").click();

    cy.findByRole("textbox", { name: /Account Name/i }).type("E2E spending");
    cy.findByRole("searchbox", { name: /Bank/i }).click();
    cy.findByText("ING").click();
    cy.findByRole("dialog", { name: /create account/i })
      .findByText("Spending")
      .click();

    cy.findByRole("button", { name: /create account/i }).click();

    cy.findByText("$0.00");

    // cy.findAllByTestId("delete-all-data-button").click();
  });
});
