import ProductRepository from '../../core/domain/repositories/ProductRepository.js';
import ProductModel from '../../frameworks/database/models/ProductModel.js';
import Boom from '@hapi/boom';

class ProductGateway extends ProductRepository {
  async getById(id) {
    return await ProductModel.findById(id);
  }

  async getAll() {
    return await ProductModel.find();
  }

  async save(product) {
    const newProduct = new ProductModel(product);
    return await newProduct.save();
  }

  async update(id, productData) {
    // new: true to return the updated document
    const result = await ProductModel.findByIdAndUpdate(id, productData, { new: true });

    if (!result) {
      throw Boom.notFound('notFound');
    }
    return result;
  }

  async delete(id) {
    const result = await ProductModel.findByIdAndDelete(id);

    if (!result) {
      throw Boom.notFound('notFound');
    }
    return result;
  }

  async getByCategoryId(categoryId) {
    return await ProductModel.find({ category_id: categoryId });
  }

}

export default ProductGateway;
