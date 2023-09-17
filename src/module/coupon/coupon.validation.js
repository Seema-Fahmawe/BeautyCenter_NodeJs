import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createCoupon = joi.object({
    name: joi.string().required(),
    expireDate: joi.string().required(),
    amount: joi.number().positive(),
}).required();

export const updateCoupon = joi.object({
    couponId: generalFields.id,
    name: joi.string(),
    expireDate: joi.string(),
    amount: joi.number().positive(),
    updatedBy: generalFields.id,
}).required();

export const getAllCoupon = joi.object({
    ownerId: generalFields.id.required(),
}).required();

export const couponDetails = joi.object({
    couponId: generalFields.id.required(),
    ownerId: generalFields.id.required(),
}).required();