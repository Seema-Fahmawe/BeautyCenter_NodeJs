import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createCoupon = joi.object({
    name: joi.string().required(),
    expireDate: joi.string().required(),
    amount: joi.number().positive().min(1).max(100).required(),
    updatedBy: generalFields.id.required(),
    createdBy: generalFields.id.required(),
}).required();

export const updateCoupon = joi.object({
    couponId: generalFields.id,
    name: joi.string(),
    amount: joi.number().positive().min(1).max(100),
    expireDate: joi.string(),
    updatedBy: generalFields.id.required(),
}).required();

export const couponDetails = joi.object({
    couponId: generalFields.id.required(),
}).required();