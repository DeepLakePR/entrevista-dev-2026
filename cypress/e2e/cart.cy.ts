context("Cart Feature", () => {

    beforeEach(() => {
        cy.get("[data-test-id='cart-handler']").as("cart-handler");
        cy.get("[data-test-id='favorites-link']").as("favorites-link");
    });
    
    describe("Add and Remove Product Using ProductCard Button", () => {
        it("should add product to cart", () => {

            
        });
    });

})
