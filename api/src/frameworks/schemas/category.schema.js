import Joi from 'joi';
import { validatePatch } from '../validators/CustomValidators.js';

const schema = {
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: Joi.string().min(3).max(30),
  description: Joi.string().min(3).max(100),
  image: Joi.string().uri(),
}

const createCategorySchema = Joi.object({
  name: schema.name.required(),
  description: schema.description.required(),
  image: schema.image.required(),
});

const patchValidator = validatePatch.bind(schema);

const patchCategorySchema = Joi.object({
  name: schema.name,
  description: schema.description,
  image: schema.image,
}).custom((value, helpers) => patchValidator(value, helpers));

const updateCategorySchema = Joi.object({
  name: schema.name.required(),
  description: schema.description.required(),
  image: schema.image.required(),
});

const getCategorySchema = Joi.object({
  id: schema.id.required(),
});

export { createCategorySchema, updateCategorySchema, getCategorySchema, patchCategorySchema };
