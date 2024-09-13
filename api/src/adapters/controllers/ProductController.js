import Boom from '@hapi/boom';
import Controller from './Controller.js';

// eslint-disable-next-line no-unused-vars
import ProductUseCases from '../../core/use_cases/ProductUseCases.js';

class ProductController extends Controller {
  constructor(productUseCases) {
    super();
    /** @type {ProductUseCases} */
    this.productUseCases = productUseCases;
  }

  index = async (req, res, next) => {

    try {

      const products = await this.productUseCases.getAllProducts();
      this.sendResponse(res, next, {
        data: products
      });
    } catch (error) {
      next(error);
    }

  }

  find = async (req, res, next) => {

    const { id } = req.params;

    try {
      const product = await this.productUseCases.getProductById(id);
      if (!product) {
        throw Boom.notFound('notFound');
      }

      this.sendResponse(res, next, {
        message: 'found',
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  store = async (req, res, next) => {

    const body = req.body;

    try {
      const product = await this.productUseCases.createProduct(body);

      this.sendResponse(res, next, {
        status: 201,
        message: 'created',
        data: product
      });

    } catch (error) {
      next(error);
    }
  }

  update = async (req, res, next) => {

    const { id } = req.params;
    const body = req.body;

    try {
      const product = await this.productUseCases.updateProduct(id, body);

      this.sendResponse(res, next, {
        message: 'updated',
        data: product
      });

    } catch (error) {
      next(error);
    }
  }

  patch = async (req, res, next) => {

    const { id } = req.params;
    const body = req.body;

    try {
      const product = await this.productUseCases.updateProduct(id, body);


      this.sendResponse(res, next, {
        message: 'patched',
        data: product,
        extra: {
          changes:body
        }
      });

    } catch (error) {
      next(error);
    }
  }

  delete = async (req, res, next) => {

    const { id } = req.params;

    try {
      await this.productUseCases.deleteProduct(id);
      this.sendResponse(res, next, {
        status: 204,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
