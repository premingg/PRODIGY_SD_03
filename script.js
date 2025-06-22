let contacts = [];

function loadContacts() {
  const saved = localStorage.getItem('contacts');
  contacts = saved ? JSON.parse(saved) : [];
}

function saveContacts() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function renderContacts() {
  const tbody = document.querySelector('#contactsTable tbody');
  tbody.innerHTML = '';
  if (contacts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#ffdba7;">No contacts found.</td></tr>`;
    return;
  }
  contacts.forEach((c, idx) => {
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
      <td>
        <button class="action-btn" onclick="editContact(${idx})">Edit</button>
        <button class="action-btn" onclick="deleteContact(${idx})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function addContact(contact) {
  contacts.push(contact);
  saveContacts();
  renderContacts();
}

function updateContact(index, contact) {
  contacts[index] = contact;
  saveContacts();
  renderContacts();
}

function deleteContact(index) {
  if (confirm('Are you sure you want to delete this contact?')) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
    resetForm();
  }
}

function editContact(index) {
  const c = contacts[index];
  document.getElementById('contactId').value = index;
  document.getElementById('name').value = c.name;
  document.getElementById('phone').value = c.phone;
  document.getElementById('email').value = c.email;
  document.getElementById('submitBtn').textContent = 'Update Contact';
  document.getElementById('cancelEditBtn').style.display = 'inline-block';
}

function resetForm() {
  document.getElementById('contactForm').reset();
  document.getElementById('contactId').value = '';
  document.getElementById('submitBtn').textContent = 'Add Contact';
  document.getElementById('cancelEditBtn').style.display = 'none';
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const idx = document.getElementById('contactId').value;
  // Only allow digits for phone number
  if (!/^\d{7,15}$/.test(phone)) {
    alert('Phone number must be 7 to 15 digits and contain only numbers.');
    return;
  }
  if (name === '' || phone === '' || email === '') {
    alert('Please fill all fields.');
    return;
  }
  const contact = { name, phone, email };
  if (idx === '') {
    addContact(contact);
  } else {
    updateContact(Number(idx), contact);
  }
  resetForm();
});

document.getElementById('cancelEditBtn').addEventListener('click', resetForm);

loadContacts();
renderContacts();