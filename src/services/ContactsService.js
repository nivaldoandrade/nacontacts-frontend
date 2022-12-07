import HttpClient from './HttpClient';
import ContactServiceMapper from './mappers/ContactServiceMapper';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listContacts(orderByName, signal) {
    const contacts = await this.httpClient.get(
      `/contacts?orderBy=${orderByName || 'ASC'}`,
      { signal }
    );

    return contacts.map(ContactServiceMapper.toDomain);
  }

  async getContactById(id, signal) {
    const contact = await this.httpClient.get(`/contacts/${id}`, { signal });

    return ContactServiceMapper.toDomain(contact);
  }

  createContact(data) {
    const body = ContactServiceMapper.toPersistent(data);

    return this.httpClient.post('/contacts', {
      body,
      headers: {
        Authorization: 'MyToken'
      }
    });
  }

  updateContactById(id, data) {
    return this.httpClient.put(`/contacts/${id}`, {
      data
    });
  }

  deleteContactById(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
