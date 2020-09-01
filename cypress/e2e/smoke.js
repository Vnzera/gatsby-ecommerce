describe('app works', () => {
    it('works', () => {
        cy.visit('/')
            .findByText(/about/i)
            .click()

    })
})
