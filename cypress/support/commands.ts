/// <reference types="cypress" />

Cypress.Commands.add("bootShop", (path = "/") => {
    cy.clearCookies();

    cy.visit(path, {
        onBeforeLoad(win) {
            win.localStorage.clear();
        },
    });
});

Cypress.Commands.add("getByTestId", (testId: string) => cy.get(`[data-test-id='${testId}']`));

Cypress.Commands.add("openCartDrawer", () => {
    cy.getByTestId("cart-handler").click();
    cy.contains("Meu carrinho").should("be.visible");
});

declare global {
    namespace Cypress {
        interface Chainable {
            getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
            bootShop(path?: string): Chainable<void>;
            openCartDrawer(): Chainable<void>;
        }
    }
}

export { };
