import ContactsService from '../ContactsService';
import HttpClient from '../HttpClient';
import ContactServiceMapper from '../mappers/ContactServiceMapper';

const contacts = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@mail.com',
    phone: '123456789',
    category_id: 1,
    category_name: 'category 1'
  },
  {
    id: 2,
    name: 'John Doe 2',
    email: 'johndoe2@mail.com',
    phone: '123456789',
    category_id: 2,
    category_name: 'category 2'
  }
];

describe('ContactsService Service', () => {
  it('should call listContacts and return contacts domain model', async () => {
    const mockedGetHttpClient = jest
      .spyOn(HttpClient.prototype, 'get')
      .mockImplementationOnce(() => contacts);

    const orderByName = '';

    const listContacts = await ContactsService.listContacts(orderByName, true);

    const expectedContacts = contacts.map(ContactServiceMapper.toDomain);

    expect(mockedGetHttpClient).toHaveBeenCalledWith(
      `/contacts?orderBy=${orderByName || 'ASC'}`,
      { signal: true }
    );
    expect(listContacts).toEqual(expectedContacts);
  });
  it('should call getContactsId and return contact domain model', async () => {
    const mockedGetHttpClient = jest
      .spyOn(HttpClient.prototype, 'get')
      .mockImplementationOnce(() => contacts[0]);

    const contactId = contacts[0].id;

    const contact = await ContactsService.getContactById(contactId, true);

    const expectedContact = ContactServiceMapper.toDomain(contacts[0]);

    expect(mockedGetHttpClient).toHaveBeenCalledWith(`/contacts/${contactId}`, {
      signal: true
    });
    expect(contact).toEqual(expectedContact);
  });
  it('should call createContact and return new contact', async () => {
    const newContact = ContactServiceMapper.toPersistent(contacts[0]);

    const mockedPostHttpClient = jest
      .spyOn(HttpClient.prototype, 'post')
      .mockImplementationOnce(() => newContact);

    const createContact = await ContactsService.createContact(contacts[0]);

    expect(mockedPostHttpClient).toHaveBeenCalledWith('/contacts', {
      body: newContact,
      headers: {
        Authorization: 'MyToken'
      }
    });
    expect(createContact).toEqual(newContact);
  });
  it('should call updateContactById and return updated contact', async () => {
    const contact = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '123456789',
      category_id: 1
    };

    const mockedPutHttpClient = jest
      .spyOn(HttpClient.prototype, 'put')
      .mockImplementationOnce(() => contact);

    const updatedContact = await ContactsService.updateContactById(1, contact);

    expect(mockedPutHttpClient).toHaveBeenCalledWith('/contacts/1', {
      body: updatedContact
    });
    expect(updatedContact).toEqual(contact);
  });
  it('should call deleteContactById', async () => {
    const mockedDeleteHttpClient = jest
      .spyOn(HttpClient.prototype, 'delete')
      .mockImplementationOnce(() => Promise.resolve());

    const contactId = 1;

    await ContactsService.deleteContactById(contactId);

    expect(mockedDeleteHttpClient).toHaveBeenCalledWith(
      `/contacts/${contactId}`
    );
  });
});
