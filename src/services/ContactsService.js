import HttpClient from './HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listContacts(orderByName = 'ASC') {
    return this.httpClient.get(`/contacts?orderBy=${orderByName}`);
  }
}

export default new ContactsService();
