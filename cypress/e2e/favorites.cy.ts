describe("Favorites", () => {
    const PRODUCTS = {
        tshirt: { id: 1, name: "Camiseta Developer" },
        mug: { id: 2, name: "Caneca Code & Coffee" },
        mousePad: { id: 3, name: "Mouse Pad Ergonomico XL" },
    } as const;

    const favoriteButtonById = (id: number) => `product-card-favorite-${id}`;
    const removeFavoriteButton = (name: string) =>
        `button[aria-label='Remover ${name} dos favoritos']`;

    beforeEach(() => {
        cy.bootShop("/");
    });

    it("adds and removes favorites from product card and details page", () => {
        cy.getByTestId(favoriteButtonById(PRODUCTS.tshirt.id))
            .should("have.attr", "aria-pressed", "false")
            .click()
            .should("have.attr", "aria-pressed", "true")
            .click()
            .should("have.attr", "aria-pressed", "false");

        cy.bootShop(`/products/${PRODUCTS.mug.id}`);
        cy.get("button[aria-label='Adicionar Caneca Code & Coffee aos favoritos']")
            .click()
            .should("have.attr", "aria-label", "Remover Caneca Code & Coffee dos favoritos")
            .click()
            .should("have.attr", "aria-label", "Adicionar Caneca Code & Coffee aos favoritos");
    });

    it("navigates to favorites page and validates saved products", () => {
        cy.getByTestId(favoriteButtonById(PRODUCTS.tshirt.id)).click();
        cy.getByTestId(favoriteButtonById(PRODUCTS.mousePad.id)).click();
        cy.getByTestId("favorites-link").click();

        cy.url().should("include", "/favorites");
        cy.contains("Favoritos").should("be.visible");
        cy.contains(PRODUCTS.tshirt.name).should("be.visible");
        cy.contains(PRODUCTS.mousePad.name).should("be.visible");
    });

    it("removes one favorite and then clears the full favorites list", () => {
        cy.getByTestId(favoriteButtonById(PRODUCTS.tshirt.id)).click();
        cy.getByTestId(favoriteButtonById(PRODUCTS.mug.id)).click();
        cy.getByTestId("favorites-link").click();

        cy.get(removeFavoriteButton(PRODUCTS.tshirt.name)).click();
        cy.contains(PRODUCTS.tshirt.name).should("not.exist");
        cy.contains(PRODUCTS.mug.name).should("be.visible");

        cy.get(removeFavoriteButton(PRODUCTS.mug.name)).click();
        cy.contains("Voce ainda nao favoritou nenhum produto.").should("be.visible");
    });
});
