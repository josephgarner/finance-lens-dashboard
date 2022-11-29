export {};

describe("[Transactions]: edit transaction", () => {
  it("the user can upload a transaction record for the ING bank", () => {
    cy.login();

    cy.findByText("E2E spending").click();
    cy.findByRole("tabpanel", {
      name: /outstanding/i,
    })
      .findByText(/lumo energy aust \- direct debit \- receipt 000020/i)
      .findByRole("button")
      .click();
  });
});
