describe("Pokemon List Page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard/pokemon");
  });

  it("navega a la lista de Pokémon", () => {
    cy.contains("h1", "Lista de Pokémon").should("be.visible");
  });

  it("permite cambiar el tamaño de página", () => {
    cy.contains("button", "10 por página").should("be.visible").click();

    cy.contains("[role='option']", "20 por página")
      .should("be.visible")
      .click();

    cy.url().should("include", "pageSize=20");
  });

  it("permite navegar entre páginas", () => {
    cy.contains("button", "Siguiente").should("exist").click();
    cy.url().should("include", "page=2");
  });
});
