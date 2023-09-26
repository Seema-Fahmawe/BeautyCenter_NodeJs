import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const createSubcategory = joi.object({
    name: joi.string().required(),
    file: generalFields.file.required(),
    categoryId: generalFields.id.required(),
}).required();

export const updateSubcategory = joi.object({
    file: generalFields.file,
    categoryId: generalFields.id.required(),
    subcategoryId: generalFields.id.required(),
    name: joi.string(),
    updatedBy: generalFields.id,
}).required();

export const allSubcategories = joi.object({
    ownerId: generalFields.id.required(),
}).required();

export const specificSubcategory = joi.object({
    categoryId: generalFields.id.required(),
}).required();

export const getProducts = joi.object({
    subcategoryId: generalFields.id.required(),
}).required();