import joi from 'joi';
import { generalFields } from './../../middleware/validation.js';

export const createReview = joi.object({
    comment: joi.string().required(),
    rating: joi.number().positive().min(1).max(5),
    ownerId:generalFields.id,
}).required();

export const updateReview = joi.object({
    comment: joi.string(),
    rating: joi.number().positive().min(1).max(5),
    reviewId: generalFields.id.required(),
    ownerId:generalFields.id,
}).required();

export const getAllReview = joi.object({
    ownerId: generalFields.id.required(),
}).required();