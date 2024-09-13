import Controller from './Controller.js';
import Boom from '@hapi/boom';

// eslint-disable-next-line no-unused-vars
import CategoryUseCases from '../../core/use_cases/CategoryUseCases.js';
// eslint-disable-next-line no-unused-vars
import ProductUseCases from '../../core/use_cases/ProductUseCases.js';


class CategoryController extends Controller {

  constructor(categoryUseCases, productUseCases) {
    super();
    /** @type {CategoryUseCases} */
    this.categoryUseCases = categoryUseCases;
    /** @type {ProductUseCases} */
    this.productUseCases = productUseCases;
  }

  index = async (req, res, next) => {

    try {
      // get all categories
      const categories = await this.categoryUseCases.getAllCategories();
      // send response
      this.sendResponse(res, next, { data: categories });

    } catch (error) {
      next(error)
    }
  }

  find = async (req, res, next) => {
    const { id } = req.params;

    try {
      // find a category
      const category = await this.categoryUseCases.getCategoryById(id);
      // check if category exists
      if (!category) {
        throw Boom.notFound('notFound');
      }
      // send response
      this.sendResponse(res, next, {
        message: 'found',
        data: category
      })

    } catch (error) {
      next(error);
    }
  }

  store = async (req, res, next) => {
    const body = req.body;

    try {
      // create a category
      const category = await this.categoryUseCases.createCategory(body);
      // send response
      this.sendResponse(res, next, {
        status: 201,
        message: 'created',
        data: category
      });

    } catch (error) {
      next(error);
    }
  }

  update = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {
      // update a category
      const category = await this.categoryUseCases.updateCategory(id, body);
      // send response
      this.sendResponse(res, next, {
        message:  'updated',
        data: category
      });

    } catch (error) {
      next(error);
    }
  }

  patch = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {
      //  partial update a category
      const category = await this.categoryUseCases.updateCategory(id, body);

      // send response
      this.sendResponse(res, next, {
        message:  'updated',
        data: category,
        extra: { changes: body }
      });

    } catch (error) {
      next(error);
    }
  }

  delete = async (req, res, next) => {
    const { id } = req.params;

    try {
      // delete a category
      await this.categoryUseCases.deleteCategory(id);
      // send response
      this.sendResponse(res, next, {
        status: 204
      });

    } catch (error) {
      next(error);
    }
  }

  getProducts = async (req, res, next) => {
    const { id } = req.params;

    try {
      const category = await this.categoryUseCases.getCategoryById(id);
      // check if category exists
      if (!category) {
        throw Boom.notFound('notFound');
      }
      // get products by category id
      const products = await this.productUseCases.getProductsByCategoryId(id);
      // send response
      this.sendResponse(res, next, {
        data: products,
        extra: { id }
      });

    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
