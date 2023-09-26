import joi from 'joi';
import { generalFields } from './../../middleware/validation.js';

export const createCategory = joi.object({
    name: joi.string().required(),
    file: generalFields.file.required(),
}).required();

export const updateCategory = joi.object({
    name: joi.string(),
    file: generalFields.file,
    categoryId: generalFields.id.required(),
    updatedBy: generalFields.id,
}).required();

export const categoryDetails = joi.object({
    categoryId: generalFields.id.required(),
}).required();

export const allCategory=joi.object({
    ownerId:generalFields.id.required(),
}).required();

export const deleteCategory = joi.object({
    categoryId: generalFields.id.required(),
}).required();

export const getProducts = joi.object({
    categoryId: generalFields.id.required(),
}).required();