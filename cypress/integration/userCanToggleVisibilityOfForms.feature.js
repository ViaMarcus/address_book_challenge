describe('the visibility of divs can be toggled by user', () => {

    before(() => {
        cy.visit('http://localhost:3001')
    })

    it('by clicking the "add contact" button,', () => {
        cy.get('#new-contact-form').should('not.be.visible');
        cy.get('#add-contact').click();
        cy.get('#new-contact-form').should('be.visible');


    })



})