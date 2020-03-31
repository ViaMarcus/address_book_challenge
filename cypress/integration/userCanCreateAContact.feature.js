describe('user can create a contact', () => {
	beforeEach('provides an input form', () => {
		cy.visit('http://localhost:3001');
		cy.wait(500);
		cy.contains("You have not contacts")
		cy.get('#add-contact').click();
		cy.get('#name').type('Slartibartfast')
		cy.get('#email').type('fake@email.se')
		cy.get('#phone').type('+4696969696969')
		cy.get('#company').type('Planetary builders')
		cy.get('#notes').type('Did Norway\'s fjords');
		cy.get('#submit').click();
	})
	it('displays a name of the new contact', () => {
		cy.get('#contact-list').should('contain', 'Slartibartfast')
		cy.get('#contact-list').should('not.contain', 'You have no contacts')
	})
})