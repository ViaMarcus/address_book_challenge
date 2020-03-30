describe('user can create a contact', () => {
	beforeEach('provides an input form', () => {
		cy.visit('http://localhost:3001');
		cy.get('#add-contact').click();
		cy.get('#name').type('Thomas')
		cy.get('#email').type('thomas@craft.se')
		cy.get('#phone').type('0700101010')
		cy.get('#company').type('Craft Academy')
		cy.get('#notes').type('Trekkie')
		cy.get('#submit').click()
	})
	it('displays a name of the new contact', () => {
		cy.get('#contact-list').should('contain', 'Thomas')
	})
	
	it('displays the phone number of the new contact', () => {
		cy.get('#contact-list').should('contain', '0700101010')
	})
})