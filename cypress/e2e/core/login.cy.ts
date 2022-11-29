export {};

describe("[AUTH]: user sign in", () => {
  it("the user can login with valid credentials", () => {
    cy.login();
    cy.findByText("Upload Transaction Record");
    cy.findAllByTestId("delete-all-data-button").click();
  });
});
