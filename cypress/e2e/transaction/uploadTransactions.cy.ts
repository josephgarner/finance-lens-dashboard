export {};

describe("[Transactions]: upload csv file", () => {
  it("the user can upload a transaction record for the ING bank", () => {
    cy.login();

    cy.findAllByTestId("transactions-view-button").click();
    cy.findAllByTestId("upload-transaction-button").click();

    cy.findAllByTestId("transactions-upload-dropzone").selectFile(
      "./cypress/fixtures/test_transactions.csv",
      {
        action: "drag-drop",
      }
    );

    cy.findByText("test_transactions.csv");

    cy.findByRole("searchbox", { name: /bank selection/i }).click();
    cy.findByText("ING").click();
    cy.findByRole("searchbox", { name: /account selection/i })
      .click()
      .wait(500)
      .type("{downArrow}")
      .type("{enter}");

    cy.findByRole("button", { name: /Upload/i }).click();

    cy.findByText("E2E spending").click();

    cy.findAllByText("Utility Bill Cashback");
  });
});
3;
