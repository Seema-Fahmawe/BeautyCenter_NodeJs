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
}).required();

export const updateProduct = joi.object({
    categoryId: generalFields.id,
    subcategoryId: generalFields.id,
    name: joi.string(),
    price: joi.number().positive(),
    description: joi.string(),
    discount: joi.number().positive(),
    file: generalFields.file,
    updatedBy: generalFields.id,
    productId: generalFields.id.required(),
}).required();

export const softDelete = joi.object({
    productId: generalFields.id.required(),
}).required();

export const forceDelete = joi.object({
    productId: generalFields.id.required(),
}).required();

export const restoreProduct = joi.object({
    productId: generalFields.id.required(),
}).required();

export const productDetails = joi.object({
    productId: generalFields.id.required(),
}).required();