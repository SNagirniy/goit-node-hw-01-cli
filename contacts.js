const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => item.id === contactId);
  return contact ? contact : null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const itemIndex = allContacts.findIndex((item) => item.id === contactId);

  if (itemIndex !== -1) {
    const deletedContact = allContacts[itemIndex];
    allContacts.splice(itemIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return deletedContact;
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

module.exports = {
  addContact,
  listContacts,
  getContactById,
  removeContact,
};
