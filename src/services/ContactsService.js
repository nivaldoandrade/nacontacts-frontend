import delay from '../utils/delay';

class ContactsService {
  async listContacts(orderByName = 'ASC') {
    const response = await fetch(
      `http://localhost:3333/contacts?orderBy=${orderByName}`
    );

    await delay(500);

    return response.json();
  }
}

export default new ContactsService();
