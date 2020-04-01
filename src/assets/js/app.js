const  storage = window.localStorage
let setOfClickedBoxes = new Set();

const  renderContacts = () => { //draws contact list
	const  contacts = JSON.parse(storage.getItem('contacts'));

	let  table = document.querySelector('#contact-table');
	const  tbody = document.createElement('tbody');
	tbody.setAttribute("id","tbod")
	if (contacts) { 
		try { //remove old contacts or "no contacts..." on redraw with contacts
			document.getElementById('tbod').remove()
		} catch(error) {}
		contacts.sort((a,b) => a.name.localeCompare(b.name));
		contacts.forEach(contact  => {
			tbody.innerHTML += `<tr>
				<td><input type="checkbox" id="${contact.id}.box" class="contact-box"></td>
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
		tbody.innerHTML = '<tr id="tbod"><td align="center" colspan="9" > You have no contacts in your address book </td></tr>'
		table.appendChild(tbody)
	}
	onRef();
}

document.addEventListener('DOMContentLoaded', () => {
	renderContacts()
	const  contactForm = document.getElementById('new-contact-form');
	const  newContactButton = document.getElementById('add-contact');
	const newContactDiv = document.getElementById('new-contact-div');
	const editContactButton = document.getElementById('edit-contact');
	const editForm = document.getElementById('edit-contact-form');
	const editContactDiv = document.getElementById('edit-contact-div');
	const deleteButton = document.getElementById('delete-contact');

	contactForm.style.display = 'none';
	editForm.style.display = 'none';

	deleteButton.addEventListener('click', event => {
		event.preventDefault();
		let contacts = JSON.parse(storage.getItem('contacts'))
		let newContacts = [];
		contacts.forEach(contact => {
			if (!setOfClickedBoxes.has(contact.id)){
				newContacts.push(contact);
			}
		})
		storage.setItem('contacts', JSON.stringify(newContacts));
		renderContacts();
	})

	editForm.addEventListener('submit', event => { //updates contact when editform is submitted.
		event.preventDefault()
		let contacts = JSON.parse(storage.getItem('contacts'));
		const { id, editName, editEmail, editPhone, editCompany, editNotes } = editForm.elements
		contact = contacts.find(x => x.id == id.value);
		console.log(contact)
			contact.name = editName.value;
			contact.email = editEmail.value;
			contact.phone = editPhone.value;
			contact.company = editCompany.value;
			contact.notes = editNotes.value;
		console.log(contact)
		storage.setItem('contacts', JSON.stringify(contacts));
		setOfClickedBoxes.clear();
		editForm.reset();
		editForm.style.display = 'none';
		editContactButton.style.color = "grey";
		editContactButton.innerHTML = '&#9654; Edit contact'
		renderContacts();
	})

	contactForm.addEventListener('submit', event  => { //This function handles form submit and then forces rerender
		event.preventDefault()

		let contacts = JSON.parse(storage.getItem('contacts')) || [] 
		let nextId = contacts.length != 0 ? contacts[contacts.length-1].id+1 : 0;
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

	newContactButton.addEventListener('click', () => { //This function allows toogle of contact form visibility
		if (contactForm.style.display === '') {
			contactForm.style.display = 'none';
			newContactButton.innerHTML= '&#9654; New contact'
			newContactDiv.style.marginTop = 0;
			
		} else {
			contactForm.style.display = '';
			newContactButton.innerHTML = '&#9660; New contact'
			newContactDiv.style.marginTop = '0.5rem';
		}
	})
	
	editContactButton.addEventListener('click', () => { //This function allows toogle of edit form visibility
		if (editForm.style.display === '' || setOfClickedBoxes.size == 0) {
			editForm.style.display = 'none';
			editContactButton.innerHTML= `&#9654;${editContactButton.innerHTML.substring(1)}`
			
		} else {
			editForm.style.display = '';
			editContactButton.innerHTML = `&#9660;${editContactButton.innerHTML.substring(1)}`
		}
	})
})
function onRef() { //activates once rerender is done
	const editContactButton = document.getElementById('edit-contact');
	const editForm = document.getElementById('edit-contact-form');
	const deleteButton = document.getElementById('delete-contact');

	document.querySelectorAll('.contact-box').forEach(box => { //Gathers all the selected checkboxes in setOfClickedBoxes and changes edit button to reflect last click
		box.addEventListener('change', event => {
			event.preventDefault();
			if (box.checked) { //add to set of clicked boxes, and sets contact up for editing
				let contacts = JSON.parse(storage.getItem('contacts'));
				let checkedId = parseInt(box.id)
				console.log(box.id)
				setOfClickedBoxes.add(checkedId);
				
				contact = contacts.find(x => x.id == checkedId);
				console.log("added " + contact.name);
				editContactButton.innerHTML = `${editContactButton.innerHTML.substring(0,1)} Edit ${contact.name}`
				editContactButton.style.color = 'black';
					document.getElementById('id').value = contact.id;
					document.getElementById('editName').value = contact.name;
					document.getElementById('editPhone').value = contact.phone;
					document.getElementById('editEmail').value = contact.email;
					document.getElementById('editCompany').value = contact.company;
					document.getElementById('editNotes').value = contact.notes;
				console.log(setOfClickedBoxes)
				deleteButton.innerHTML = `&#10060; Delete ${setOfClickedBoxes.size}`;
				deleteButton.style.color = "black";
			} else {//removes from set of clicked boxes, and disables editing form
				setOfClickedBoxes.delete(parseInt(box.id));
				editContactButton.style.color = 'grey';
				editContactButton.innerHTML = `&#9654; Edit contact`;
				console.log(setOfClickedBoxes)
				editForm.style.display = 'none';
				deleteButton.innerHTML = `&#10060; Delete ${setOfClickedBoxes.size}`;
				if (setOfClickedBoxes.size == 0) {
					deleteButton.innerHTML = `&#10060; Delete`;
					deleteButton.style.color = 'grey';
				}
			}
		})
	})
}