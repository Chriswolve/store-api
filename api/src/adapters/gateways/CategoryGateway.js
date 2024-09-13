import CategoryRepository from '../../core/domain/repositories/CategoryRepository.js';
import CategoryModel from '../../frameworks/database/models/CategoryModel.js';
import Boom from '@hapi/boom';

class CategoryGateway extends CategoryRepository {
  async getById(id) {
    return await CategoryModel.findById(id);
  }

  async getAll() {
    return await CategoryModel.find();
  }

  async save(product) {
    const newProduct = new CategoryModel(product);
    return await newProduct.save();
  }

  async update(id, categoryData) {
    const result = await CategoryModel.findByIdAndUpdate(id, categoryData, { new: true })
    // new: true to return the updated document
    if (!result) {
      throw Boom.notFound('notFound');
    }
    return result;
  }

  async delete(id) {
    const result = await CategoryModel.findByIdAndDelete(id);
    if (!result) {
      throw Boom.notFound('notFound');
    }
    return result;
  }
}

export default CategoryGateway;
