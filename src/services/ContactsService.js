import HttpClient from './HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listContacts(orderByName = 'ASC') {
    return this.httpClient.get(`/contacts?orderBy=${orderByName}`);
  }

  async createContact(data) {
    return this.httpClient.post('/contacts', {
      data,
      headers: {
        Authorization: 'MyToken'
      }
    });
  }
}

export default new ContactsService();
