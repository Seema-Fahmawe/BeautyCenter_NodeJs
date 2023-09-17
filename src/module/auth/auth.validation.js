import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const signup = joi.object({
    file: generalFields.file,
    userName: joi.string().min(3).max(20).required(),
    password: generalFields.password,
    email: generalFields.email.required(),
    cPassword: joi.string().valid(joi.ref('password')).required(),
    phone: joi.string(),
    gender: joi.string(),
}).required();

export const token = joi.object({
    token: joi.string().required(),
}).required();

export const signin = joi.object({
    email: generalFields.email.required(),
    password: generalFields.password,
}).required();

export const sendCode = joi.object({
    email: generalFields.email.required(),
}).required();

export const forgetPassword = joi.object({
    email: generalFields.email.required(),
    password: generalFields.password,
    code: joi.string().required(),
    cPassword: joi.string().valid(joi.ref('password')).required(),
}).required();

export const signupOwner = joi.object({
    ownerName: joi.string().min(3).max(20).required(),
    centerName: joi.string().required(),
    password: generalFields.password,
    email: generalFields.email.required(),
    cPassword: joi.string().valid(joi.ref('password')).required(),
    file: generalFields.file,
    phone: joi.string().required(),
    city: joi.string().required(),
    gender: joi.string(),
    workDays: joi.array(),
    startTimeWork:joi.string(),
    endTimeWork:joi.string(),
}).required();