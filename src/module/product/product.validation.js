import joi from 'joi';
import { generalFields } from './../../middleware/validation.js';

export const createProduct = joi.object({
    categoryId: generalFields.id,
    subcategoryId: generalFields.id,
    name: joi.string().required(),
    price: joi.number().positive().required(),
    description: joi.string(),
    discount: joi.number().positive(),
    stock: joi.number().positive(),
    file: generalFields.file,
}).required();