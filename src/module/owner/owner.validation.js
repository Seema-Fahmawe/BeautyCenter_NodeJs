import joi from 'joi';
import { generalFields } from './../../middleware/validation.js';

export const updateStatusOwner = joi.object({
    ownerId: generalFields.id.required(),
}).required();

export const ownerDetails = joi.object({
    ownerId: generalFields.id.required(),
}).required();

export const updateOwner = joi.object({
    phone: joi.string(),
    city: joi.string(),
    centerName:joi.string(),
}).required();

export const deleteOwner = joi.object({
    ownerId: generalFields.id.required(),
}).required();