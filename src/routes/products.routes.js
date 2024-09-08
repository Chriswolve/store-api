import { Router } from 'express';

import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  patchProductSchema
} from '../frameworks/schemas/product.schema.js';
import $v from '../frameworks/http/middlewares/validator.middleware.js';


import ProductController from '../adapters/controllers/ProductController.js';
import ProductGateway from '../adapters/gateways/ProductGateway.js';
import ProductUseCases from '../core/use_cases/ProductUseCases.js';

// Validation Middlewares
const validateCreateBody = $v(createProductSchema, 'body');
const validateUpdateBody = $v(updateProductSchema, 'body');
const validateID = $v(getProductSchema, 'params');
const validatePatch = $v(patchProductSchema, 'body');

// Instance and dependencies of the ProductController
const productGateway = new ProductGateway();
const productUsesCases = new ProductUseCases(productGateway);
const productController = new ProductController(productUsesCases);


const router = Router();

router.get('/', productController.index);
router.get('/:id', validateID, productController.find);
router.post('/', validateCreateBody, productController.store);
router.put('/:id', [validateID, validateUpdateBody], productController.update);
router.patch('/:id', [validateID,validatePatch], productController.patch);
router.delete('/:id', validateID, productController.delete);

export default router;
