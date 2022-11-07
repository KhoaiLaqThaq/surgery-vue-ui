describe('Test example', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io')
    })

    it('Testcase 1', () => {
        cy.contains('type')
            .click()

        cy.url().should('include', '/commands/actions')

        cy.get('.action-email')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')
    })

    it('The same testcase 1 using Given, When and Then', () => {
        cy.contains('type')
           .click()
        cy.get('.action-email')
            .type('fake@email.com')
            
        cy.url().should('include', '/commands/actions')
        
        cy.get('.action-email')
            .should('have.value', 'fake@email.com')
        
    })
})