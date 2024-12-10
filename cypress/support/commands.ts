/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      mockAuth(): Chainable<void>;
      login(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("mockAuth", () => {
  // Interceptar la llamada de sesión
  cy.intercept("GET", "/api/auth/session", {
    statusCode: 200,
    body: {
      user: {
        name: "Test User",
        email: "test@example.com",
        image: "https://example.com/avatar.jpg",
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
  }).as("session");

  // Interceptar cualquier redirección de autenticación
  cy.intercept("GET", "/api/auth/signin?*", {
    statusCode: 200,
    body: {},
  });
});

Cypress.Commands.add("login", () => {
  cy.session(
    "auth",
    () => {
      cy.setCookie(
        "__Secure-authjs.session-token",
        "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiNmNrQTkyU0FJSkNYSTM4Y1hfM0hJUTR5V1didnlFUmNOSGR4WU5Uc3Q5MVpwTE9XTzY0Mm0tRG9hN05XX2EwZU4wMGFTbzhWM2hCcmp0UVFuM2FFeEEifQ..UgHEy3waGSg7NITOTXuaGQ.CvjoWrGTb9S3rio0oDSKciOwd2lh78J5UjQHg-tJyRdXBfCDpu6sruIAs5NQ3eIn1rTOf27qnuY1l5pZ77bVo10HD5wNzROdxNlJN_8RnIT0hhjw-MXZHH6_EUifPkSHSqazJxnNs8nLEsr-iKGAZ_WnShzpmRgEeg2hk74zLvTqrVirXzwcbdniR2ep15ZC6VIchbP73lwdys-l-7LZukffs9Sovn7xKhRkmI4LsGqjLxZJJZWWCpNuiMvjXGfR0_8s8Cq0Nq60B09tVqjFvBJaiu8h-oI-4xarBXI6_T-kh1Bdbz2hVQ1oLspJSf5VgMdXbjnlSiNtvUjl3QvPMQ7Y-j9IaGSPyYAFIgSixxDUNjJc7GCbHJFjcNTWgaH0_Ym7uh-XWpNMFUpZn-jUCFrhbIRFdmal5pAYNoApFkKCf3Bdm6gVuVzAkXY_8fxzqKrxpURf27GCGzFQggffU4FV7cfD3Ai6iV9ocLme9Gs.t69SpPuwVC6-Hc_VIDSJ7D5fDwj5AJOzVyJS0GIc594",
        {
          secure: true,
          path: "/",
        }
      );

      cy.setCookie("next-auth.callback-url", "https://localhost:3000", {
        secure: true,
        path: "/",
      });

      cy.visit("/");
    },
    {
      validate: () => {
        cy.getCookie("__Secure-authjs.session-token").should("exist");
      },
    }
  );

  cy.visit("/dashboard");
});
