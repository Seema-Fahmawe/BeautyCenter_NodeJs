import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const profilePic = joi.object({
    file: generalFields.file.required(),
}).required();

export const addSupervisorAdmin = joi.object({
    file: generalFields.file,
    userName: joi.string().min(3).max(20).required(),
    password: generalFields.password,
    email: generalFields.email.required(),
    cPassword: joi.string().valid(joi.ref('password')).required(),
    phone: joi.string(),
}).required();

export const userDetails = joi.object({
    userId: generalFields.id,
}).required();

export const updatePassword = joi.object({
    oldPassword: generalFields.password.required(),
    newPassword: generalFields.password.required(),
}).required();

export const deleteSupervisorAdmin = joi.object({
    supervisorId: generalFields.id,
}).required();

export const updateSupervisorAdmin = joi.object({
    file: generalFields.file,
    userName: joi.string().min(3).max(20),
    phone: joi.string(),
    supervisorId: generalFields.id,
}).required();