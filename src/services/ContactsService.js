import HttpClient from './HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  listContacts(orderByName = 'ASC') {
    return this.httpClient.get(`/contacts?orderBy=${orderByName}`);
  }

  getContactById(id) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  createContact(data) {
    return this.httpClient.post('/contacts', {
      data,
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
