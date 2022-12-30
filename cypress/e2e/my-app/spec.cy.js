describe('Login app', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    context('Show list material', () => {
        const keyword = 'chứa'
        const materialName = 'Clinit'
        beforeEach(() => {

        })

        it('Login testcase', () => {
            const password = '12345678'
            cy.get('#emailaddress').type('admin')
                .should('have.value', 'admin')
    
            cy.get('#password').type(`${password}{enter}`)
    
            // show list sub nav common
            cy.get('#common').click()

            // show material list
            cy.get('#material').click()
            
            // show header item
            cy.get('.list__header__no').should('be.visible')
            cy.get('.list__header__code').should('be.visible')
            cy.get('.list__header__name').should('be.visible')
            cy.get('.list__header__composition').should('be.visible')
            cy.get('.list__header__price').should('be.visible')
            cy.get('.list__header__sales').should('be.visible')

            // search material
            cy.get('#keyword').type(keyword)
            cy.get('button.btnSubmit')
                .click()
            // reload
            cy.reload()

            // search by filter name
            cy.get('.search-filter').should('be.visible')
                .click()
            cy.get('.modal-title').should('contain', 'Filter')
            cy.get('#name').should('be.visible')
                .type(materialName)
            cy.get('.btn__apply').click()

            // onSearch
            cy.get('button.btnSubmit')
                .click()
        })
    })
})