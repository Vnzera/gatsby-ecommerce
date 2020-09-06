describe('app', () => {
    it('works', () => {
        cy.visit('/')
            .findByText(/headset/i)

    })
})
