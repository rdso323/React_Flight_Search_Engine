describe("Testing search", function () {
    beforeEach(()=> {
        cy.visit('/')
    })

  it("Visits flight engine home", function () {
    //expect(true).to.equal(true)
    cy.visit("/");

    cy.wait(500);

  });

  it("Enters values and show Result", () => {
    cy.contains("Return").click();

    cy.wait(500);
    //cy.get("input").within(() => {

    cy.get(".origin_return")
        .type("Pune", { delay: 100 })
        .should("have.value", "Pune");

    cy.get(".destination_return")
        .type("Delhi", { delay: 100 })
        .should("have.value", "Delhi");

    cy.get(".dept_date_return", { delay: 100 })
      .type("2020-04-08")
      .should("have.value", "2020-04-08");

    cy.get(".arr_date_return", { delay: 100 })
      .type("2020-04-05")
      .should("have.value", "2020-04-05");

    cy.get(".passengers_return").type("2", { delay: 100 }).should("have.value", "2");

    cy.get(".submit_return").click();

    cy.get('.results');
  });
});
