import Product from '../domain/entities/Product.js';


// eslint-disable-next-line no-unused-vars
import ProductGateway from '../../adapters/gateways/ProductGateway.js';

class ProductUseCases {
  constructor(productRepository) {
    /** @type {ProductGateway} */
    this.productRepository = productRepository;
  }

  async getProductById(id) {
    return await this.productRepository.getById(id);
  }

  async getAllProducts() {
    return await this.productRepository.getAll();
  }

  async createProduct(productData) {
    const product = new Product(productData);
    return await this.productRepository.save(product);
  }

  async updateProduct(id, productData) {
    return await this.productRepository.update(id, productData);
  }

  async deleteProduct(id) {
    return await this.productRepository.delete(id);
  }
  async getProductsByCategoryId(categoryId) {
    return await this.productRepository.getByCategoryId(categoryId);
  }


}

export default ProductUseCases;
