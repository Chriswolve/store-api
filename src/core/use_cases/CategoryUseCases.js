import Category from '../domain/entities/Category.js';

// eslint-disable-next-line no-unused-vars
import CategoryGateway from '../../adapters/gateways/CategoryGateway.js';

class CategoryUseCases {

  constructor(categoryRepository) {
    /** @type {CategoryGateway} */
    this.categoryRepository = categoryRepository;
  }

  async getCategoryById(id) {
    return await this.categoryRepository.getById(id);
  }

  async getAllCategories() {
    return await this.categoryRepository.getAll();
  }

  async createCategory(categoryData) {
    const category = new Category(categoryData);
    return await this.categoryRepository.save(category);
  }

  async updateCategory(id, categoryData) {
    return await this.categoryRepository.update(id, categoryData);
  }

  async deleteCategory(id) {
    return await this.categoryRepository.delete(id);
  }

}

export default CategoryUseCases;
