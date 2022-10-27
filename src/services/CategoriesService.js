import HttpClient from './HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async get() {
    return this.httpClient.get('/categories');
  }
}

export default new CategoriesService();
