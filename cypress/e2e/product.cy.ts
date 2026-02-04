describe("Product", () => {
    const SELECTORS = {
        productCards: "[data-test-id^='product-card-'][href^='/products/']",
        sortTrigger: "button[aria-labelledby='sort-products-label']",
        searchInput: "#search-products",
    } as const;

    const EXPECTED = {
        totalProducts: 10,
        peripheralsCount: 4,
        highestPriceProductName: 'Monitor LED 24" Full HD',
        productDetails: {
            route: "/products/4",
            name: "Hub USB-C 7 Portas",
            priceText: "199,90",
            category: "Perifericos",
        },
    } as const;

    beforeEach(() => {
        cy.bootShop("/");
    });

    it("lists all 10 products on the home page", () => {
        cy.get(SELECTORS.productCards).should("have.length", EXPECTED.totalProducts);
        cy.contains("Camiseta Developer").should("be.visible");
        cy.contains(EXPECTED.highestPriceProductName).should("be.visible");
    });

    it("filters products by category from the home category list", () => {
        cy.contains("button", "Perifericos").click();
        cy.get(SELECTORS.productCards).should("have.length", EXPECTED.peripheralsCount);
        cy.contains("Mouse Pad Ergonomico XL").should("be.visible");
        cy.contains("Teclado Mecanico Compacto").should("be.visible");
    });

    it("filters products by descending price", () => {
        cy.get(SELECTORS.sortTrigger).click();
        cy.contains("[role='option']", "Decrescente").click();

        cy.get(SELECTORS.productCards)
            .first()
            .should("contain.text", EXPECTED.highestPriceProductName);
    });

    it("filters products by name", () => {
        cy.get(SELECTORS.searchInput).type("teclado");
        cy.get(SELECTORS.productCards).should("have.length", 1);
        cy.contains("Teclado Mecanico Compacto").should("be.visible");
    });

    it("opens product details and validates name, price, and category", () => {
        cy.visit(EXPECTED.productDetails.route);
        cy.get("h1#product-name").should("have.text", EXPECTED.productDetails.name);
        cy.contains("p", EXPECTED.productDetails.priceText).should("be.visible");
        cy.contains("a", EXPECTED.productDetails.category).should("be.visible");
    });
});
