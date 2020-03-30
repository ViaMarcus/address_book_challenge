const  storage = window.localStorage

const  renderContacts = () => {
  const  contacts = JSON.parse(storage.getItem('contacts'));

  let  div = document.querySelector('#contact-list');
  if (contacts) {
	div.innerHTML = '';
	const  ul = document.createElement('ul');

	contacts.forEach(contact  => {
		let  li = document.createElement('li');

		li.innerHTML = `
		  <span>${contact.name}</span> |
		  <span>${contact.email}</span> |
		  <span>${contact.phone}</span>
	    `;
	    ul.appendChild(li);
	  })
			
	  div.appendChild(ul);
	} else {
	  div.innerHTML = '<p>You have no contacts in your address book</p>'
	}
}

document.addEventListener('DOMContentLoaded', () => {
	renderContacts()
	const  contactForm = document.getElementById('new-contact-form');
	const  newContactButton = document.getElementById('add-contact');
	contactForm.style.display = 'none';

	newContactButton.addEventListener('click', () => {
		if (contactForm.style.display === '') {
			contactForm.style.display = 'none';
			newContactButton.innerHTML= '&#9654; New'
		} else {
			contactForm.style.display = '';
			newContactButton.innerHTML = '&#9660; New'
		}
	})





	contactForm.addEventListener('submit', event  => {
		event.preventDefault()

		const { name, email, phone, company, notes } = contactForm.elements
		const  contact = {
			name:  name.value,
			email:  email.value,
			phone:  phone.value,
			company:  company.value,
			notes:  notes.value,
		}

		console.log(contact)

		let  contacts = JSON.parse(storage.getItem('contacts')) || []

		contacts.push(contact)

		storage.setItem('contacts', JSON.stringify(contacts))
		renderContacts()
		contactForm.reset()
   })
})