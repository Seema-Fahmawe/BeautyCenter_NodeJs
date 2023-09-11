import joi from 'joi';
import { generalFields } from './../../middleware/validation.js';

export const createProduct = joi.object({
    categoryId: generalFields.id.required(),
    subcategoryId: generalFields.id.required(),
    name: joi.string().required(),
    price: joi.number().positive().required(),
    description: joi.string(),
    discount: joi.number().positive(),
    file: generalFields.file,
    createdBy: generalFields.id.required(),
    updatedBy: generalFields.id.required(),
}).required();

export const updateProduct = joi.object({
    categoryId: generalFields.id,
    subcategoryId: generalFields.id,
    name: joi.string(),
    price: joi.number().positive(),
    description: joi.string(),
    discount: joi.number().positive(),
    file: generalFields.file,
    updatedBy: generalFields.id.required(),
}).required();