const  storage = window.localStorage

const  renderContacts = () => {
	const  contacts = JSON.parse(storage.getItem('contacts'));

	let  table = document.querySelector('#contact-table');
	const  tbody = document.createElement('tbody');
	tbody.setAttribute("id","tbod")
	if (contacts) {
		try {
			document.getElementById('no-contacts').remove()
		} catch(error) {}
		try {
			document.getElementById('tbod').remove()
		} catch(error) {}
		
		contacts.forEach(contact  => {
			tbody.innerHTML += `<tr>
				<td><input type="checkbox" id="${contact.id}.box"></td>
				<td>${contact.name}</td>
				<td>${contact.email}</td>
				<td>${contact.phone}</td>
				<td>${contact.company}</td>
				<td>${contact.notes}</td>
				<td>${""}</td>
				<td>${""}</td>
				<td>${""}</td></tr>`;
	  })
	  table.appendChild(tbody);
	} else {
		tbody.innerHTML = '<tr id="no-contacts"><td align="center" colspan="9" > You have no contacts in your address book </td></tr>'
		table.appendChild(tbody)
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

		let contacts = JSON.parse(storage.getItem('contacts')) || [] 
		let nextId = contacts.length != 0 ? contacts[contacts.length-1].id+1 : 0;
/*		if (contacts.length != 0) {
			nextId = contacts[contacts.length-1].id+1
		} else {
			nextId = 0;
		} */
		const { name, email, phone, company, notes } = contactForm.elements
		const  contact = {
			id: nextId,
			name:  name.value,
			email:  email.value,
			phone:  phone.value,
			company:  company.value,
			notes:  notes.value,
		}

		console.log(contact)

		contacts.push(contact)

		storage.setItem('contacts', JSON.stringify(contacts))
		renderContacts()
		contactForm.reset()
   })
})