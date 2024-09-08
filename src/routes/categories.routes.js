import { Router } from 'express';

import {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  patchCategorySchema
} from '../frameworks/schemas/category.schema.js';

import $v from '../frameworks/http/middlewares/validator.middleware.js';


import CategoryGateway from '../adapters/gateways/CategoryGateway.js';
import CategoryUseCases from '../core/use_cases/CategoryUseCases.js';
import CategoryController from '../adapters/controllers/CategoryController.js';

import ProductGateway from '../adapters/gateways/ProductGateway.js';
import ProductUseCases from '../core/use_cases/ProductUseCases.js';

// Validation Middlewares

const validateCreateBody = $v(createCategorySchema,'body');
const validateUpdateBody = $v(updateCategorySchema, 'body');
const validatePatch = $v(patchCategorySchema, 'body');
const validateID = $v(getCategorySchema, 'params');

// Create an instance and dependencies of the CategoryController

const productRepository = new ProductGateway();
const productUseCases = new ProductUseCases(productRepository);

const categoryRepository = new CategoryGateway();
const categoryUsesCases = new CategoryUseCases(categoryRepository);
const categoryController = new CategoryController(categoryUsesCases,productUseCases);


const router = Router();

router.get('/', categoryController.index);
router.get('/:id',validateID, categoryController.find);
router.get('/:id/products', validateID, categoryController.getProducts);
router.post('/',validateCreateBody, categoryController.store);
router.put('/:id',[validateID,validateUpdateBody],categoryController.update);
router.patch('/:id',[validateID,validatePatch], categoryController.patch);
router.delete('/:id',validateID, categoryController.delete);

export default router;
