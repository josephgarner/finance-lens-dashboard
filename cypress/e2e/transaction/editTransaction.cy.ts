export {};

describe("[Transactions]: edit transaction", () => {
  it("the user can upload a transaction record for the ING bank", () => {
    cy.login();

    cy.findByText("E2E spending").click();
    cy.findByRole("tabpanel", {
      name: /outstanding/i,
    })
      .findByText(/lumo energy aust \- direct debit \- receipt 000020/i)
      .click();

    cy.findAllByTestId("edit-transaction-button").click();

    cy.findByRole("radio", { name: /Transfer/i })
      .siblings()
      .click();

    cy.findByRole("textbox", {
      name: /new description/i,
    }).type("Lumo Monthy Energy Bill");

    cy.findByRole("searchbox", {
      name: /Transaction Category/i,
    })
      .type("Bills")
      .type("{downArrow}")
      .type("{enter}");

    cy.findByRole("searchbox", {
      name: /subcategory/i,
    })
      .type("Power")
      .type("{downArrow}")
      .type("{enter}");

    cy.findByRole("textbox", {
      name: /vendor/i,
    }).type("Lumo");

    cy.findByRole("button", {
      name: /Update Transaction/i,
    }).click();

    cy.findByRole("tab", {
      name: /history/i,
    }).click();

    cy.findByText("Lumo Monthy Energy Bill");

    cy.findByText("Transfer");
  });
});
