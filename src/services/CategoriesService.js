import HttpClient from './HttpClient';
import CategoryServiceMapper from './mappers/CategoryServiceMapper';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async get() {
    const categories = await this.httpClient.get('/categories');

    return categories.map((category) =>
      CategoryServiceMapper.toDomain(category)
    );
  }
}

export default new CategoriesService();
