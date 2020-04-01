describe('user can edit a contact', () => {
	it('can access the edit contact form only if having checked a contact first', () => {
		cy.visit('http://localhost:3001') //create the contact
		cy.get('#add-contact').click();
		cy.get('#name').type('Slartibartfast');
		cy.get('#email').type('fake@email.se');
		cy.get('#phone').type('+4696969696969');
		cy.get('#company').type('Planetary builders');
		cy.get('#notes').type('Did Norway\'s fjords');
		cy.get('#submit').click();
		cy.get('#contact-list').should('contain','Slartibartfast'); //check if creation successful
		cy.get('#edit-contact').click(); //check so that edit is not possible
		cy.expect('#edit-button-div').to.not.include('editing');
		cy.get('0.box').click();//click a checkbox
		cy.expect('#edit-button-div').to.include('Slartibartfast');
		cy.expect('#edit-button-div').to.include('editing');

	})
})