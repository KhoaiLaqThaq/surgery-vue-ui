describe('Login app', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Login testcase', () => {
        const password = '12345678'
        cy.get('#emailaddress').type('admin')
            .should('have.value', 'admin')

        cy.get('#password').type(`${password}{enter}`)

        cy.get('#common').click()
        
    })


})