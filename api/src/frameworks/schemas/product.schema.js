import Joi from 'joi';
import { validatePatch } from '../validators/CustomValidators.js';

const schema = {
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  category_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: Joi.string().min(3).max(30),
  price: Joi.number().precision(2).min(0.1).max(100000),
  stock: Joi.number().integer().min(0).max(1000),
  image: Joi.string().uri(),
}


const createProductSchema = Joi.object({
  name: schema.name.required(),
  price: schema.price.required(),
  stock: schema.stock.required(),
  image: schema.image.required(),
  category_id: schema.category_id.required(),
});

const patchValidator = validatePatch.bind(schema);

const patchProductSchema = Joi.object({
  name: schema.name,
  price: schema.price,
  stock: schema.stock,
  image: schema.image,
  category_id: schema.category_id,
}).custom((value, helpers) => patchValidator(value, helpers));

const updateProductSchema = Joi.object({
  name: schema.name,
  price: schema.price,
  stock: schema.stock,
  image: schema.image,
  category_id: schema.category_id,
});

const getProductSchema = Joi.object({
  id: schema.id.required(),
});

export { createProductSchema, updateProductSchema, getProductSchema, patchProductSchema };
