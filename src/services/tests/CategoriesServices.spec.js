import CategoriesService from '../CategoriesService';

const categories = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' }
];

jest.mock('../HttpClient', () =>
  jest.fn().mockImplementation(() => ({
    get: () => categories
  }))
);

describe('CategoriesServices Service', () => {
  it('should map categories from API to domain model', async () => {
    const getterCategories = await CategoriesService.get();

    expect(getterCategories).toEqual(categories);
  });
});
