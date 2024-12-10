describe("Dashboard", () => {
  beforeEach(() => {
    cy.login();
  });

  it("muestra las estadísticas correctamente", () => {
    cy.contains(".text-2xl", "1008").should("be.visible");
    cy.contains(".text-sm", "Pokémon Totales").should("be.visible");
  });

  it("muestra los gráficos correctamente", () => {
    cy.get("svg").should("have.length.at.least", 1);
  });

  it("permite cambiar el tema", () => {
    // Establecer el tema inicial usando localStorage
    cy.window().then((win) => {
      win.localStorage.setItem("theme", "light");
    });

    // Recargar la página para aplicar el tema inicial
    cy.reload();

    // Verificar el estado inicial
    cy.get("html").should("have.class", "light");

    // Hacer clic en el botón de tema
    cy.get('[data-testid="theme-toggle"]').should("be.visible").click();

    // Verificar el cambio de tema
    cy.get("html", { timeout: 10000 })
      .should("have.class", "dark")
      .should("not.have.class", "light");
  });
});
