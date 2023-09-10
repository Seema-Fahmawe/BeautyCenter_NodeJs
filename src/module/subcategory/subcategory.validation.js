import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const createSubcategory = joi.object({
    name: joi.string().required(),
    file: generalFields.file.required(),
    categoryId: generalFields.id,
}).required();

export const updateSubcategory = joi.object({
    file: generalFields.file,
    categoryId: generalFields.id,
    subcategoryId: generalFields.id,
    name: joi.string(),
}).required();

export const specificSubcategory=joi.object({
    categoryId:generalFields.id,
}).required();