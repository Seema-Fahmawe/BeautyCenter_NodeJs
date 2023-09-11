import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const profilePic = joi.object({
    file: generalFields.file.required(),
}).required();

export const userDetails = joi.object({
    userId: generalFields.id.required(),
}).required();

export const updatePassword = joi.object({
    oldPassword: generalFields.password.required(),
    newPassword: generalFields.password.required(),
}).required();

