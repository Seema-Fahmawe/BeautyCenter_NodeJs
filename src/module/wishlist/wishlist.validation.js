import joi from 'joi';
import { generalFields } from './../../middleware/validation.js';

export const createWishlist = joi.object({
    productId: generalFields.id.required(),
}).required();

export const deleteItem = joi.object({
    productIds: joi.array().required(),
}).required();
