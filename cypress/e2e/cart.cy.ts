describe("Cart", () => {
    const PRODUCTS = {
        tshirt: {
            id: 1,
            name: "Camiseta Developer",
            unitPrice: 79.9,
        },
        mug: {
            id: 2,
            name: "Caneca Code & Coffee",
            unitPrice: 49.9,
        },
        mousePad: {
            id: 3,
            name: "Mouse Pad Ergonomico XL",
        },
        hub: {
            id: 4,
            name: "Hub USB-C 7 Portas",
        },
        monitor: {
            id: 10,
            stockLimit: 5,
        },
    } as const;

    const cartButtonById = (id: number) => `product-card-cart-${id}`;
    const buyButtonById = (id: number) => `product-card-buy-${id}`;
    const closeDrawerButton = "button[aria-label='Fechar painel do carrinho']";
    const cartEmptyMessage = "Seu carrinho esta vazio.";

    const formatBRL = (value: number) => new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);

    const closeCartDrawer = () => {
        cy.get(closeDrawerButton).click();
    };

    beforeEach(() => {
        cy.bootShop("/");
    });

    it("adds and removes an item using cart buttons from product card and details page", () => {
        cy.getByTestId(cartButtonById(PRODUCTS.tshirt.id)).click();
        cy.openCartDrawer();
        cy.contains(PRODUCTS.tshirt.name).should("be.visible");

        closeCartDrawer();
        cy.getByTestId(cartButtonById(PRODUCTS.tshirt.id)).click();
        cy.openCartDrawer();
        cy.contains(cartEmptyMessage).should("be.visible");

        cy.bootShop(`/products/${PRODUCTS.mug.id}`);
        cy.get("button[aria-label='Adicionar Caneca Code & Coffee ao carrinho']").click();
        cy.openCartDrawer();
        cy.contains(PRODUCTS.mug.name).should("be.visible");

        closeCartDrawer();
        cy.get("button[aria-label='Remover Caneca Code & Coffee do carrinho']").click();
        cy.openCartDrawer();
        cy.contains(cartEmptyMessage).should("be.visible");
    });

    it("adds an item using buy buttons and opens the cart drawer from card and details page", () => {
        cy.getByTestId(buyButtonById(PRODUCTS.mousePad.id)).click();
        cy.contains("Meu carrinho").should("be.visible");
        cy.contains(PRODUCTS.mousePad.name).should("be.visible");

        cy.bootShop(`/products/${PRODUCTS.hub.id}`);
        cy.get("button[aria-label='Comprar Hub USB-C 7 Portas agora']").click();
        cy.contains("Meu carrinho").should("be.visible");
        cy.contains(PRODUCTS.hub.name).should("be.visible");
    });

    it("increments and decrements quantity and enforces minimum and maximum limits", () => {
        cy.getByTestId(buyButtonById(PRODUCTS.monitor.id)).click();
        cy.contains("Meu carrinho").should("be.visible");

        cy.get("button[aria-label*='Diminuir quantidade de Monitor LED 24']").should("be.disabled");

        Cypress._.times(PRODUCTS.monitor.stockLimit - 1, () => {
            cy.get("button[aria-label*='Aumentar quantidade de Monitor LED 24']").click();
        });

        cy.get("output[aria-label='Quantidade: 5']").should("be.visible");
        cy.get("button[aria-label*='Aumentar quantidade de Monitor LED 24']").should("be.disabled");

        cy.get("button[aria-label*='Diminuir quantidade de Monitor LED 24']").click();
        cy.get("output[aria-label='Quantidade: 4']").should("be.visible");
    });

    it("removes an item from the cart drawer", () => {
        cy.getByTestId(buyButtonById(PRODUCTS.tshirt.id)).click();
        cy.contains(PRODUCTS.tshirt.name).should("be.visible");

        cy.get("button[aria-label='Remover Camiseta Developer']").click();
        cy.contains(cartEmptyMessage).should("be.visible");
        cy.getByTestId("cart-handler").should("contain.text", "0");
    });

    it("shows the correct total price in the cart drawer footer", () => {
        const expectedTotal = formatBRL(
            PRODUCTS.tshirt.unitPrice * 2 + PRODUCTS.mug.unitPrice,
        );
        const normalizeText = (value: string) => value.replace(/\s+/g, " ").trim();

        cy.getByTestId(cartButtonById(PRODUCTS.tshirt.id)).click();
        cy.getByTestId(cartButtonById(PRODUCTS.mug.id)).click();
        cy.openCartDrawer();

        cy.get("button[aria-label='Aumentar quantidade de Camiseta Developer']").click();

        cy.getByTestId("cart-total-price")
            .should("be.visible")
            .invoke("text")
            .then((text) => {
                expect(normalizeText(text)).to.equal(
                    normalizeText(`Total: ${expectedTotal}`),
                );
            });
    });
});
