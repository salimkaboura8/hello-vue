describe("Box component E2E", () => {
  it("renders bubbles when count changes", () => {
    cy.visit("http://localhost:8080");
    cy.get(".box").should("exist");
    cy.get(".bubble").should("not.exist");

    cy.get("button.increment").click();
    cy.get(".bubble").should("have.length.at.least", 1);
  });
});
