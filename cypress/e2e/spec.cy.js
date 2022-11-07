describe('My first test', () => {
  it('Visit the kitchen sink', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a now URL which
    // includes '/commands/actions'
    // TODO: lấy url hiện tại, sau đó tải lại trang với url+'/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it and verify
    // that the value has been updated
    cy.get('.action-email')
    .type('fake@email.com')
    .should('have.value', 'fake@email.com')

    cy.get('#password1')
    .type('1234567a@')
    .should('have.value', '1234567a@')

    // cy.contains("focus").click().should()
  })
})