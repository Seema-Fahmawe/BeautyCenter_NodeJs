import joi from 'joi';
import { generalFields } from './../../middleware/validation.js';

export const createReservation = joi.object({
    date: joi.string().required(),
    ownerId: generalFields.id.required(),
    products: joi.array().required(),
    couponName: joi.string(),
    status: joi.string(),
}).required();

export const updateReservation = joi.object({
    date: joi.string(),
    ownerId: generalFields.id,
    reservationId:generalFields.id.required(),
    userId:generalFields.id,
    products: joi.array(),
    status: joi.string(),
}).required();

export const delayReservation = joi.object({
    reservationId: generalFields.id.required(),
    date: joi.string().required(),
}).required();

export const canceleReservation = joi.object({
    reservationId: generalFields.id.required(),
}).required();

export const reservationDetails = joi.object({
    reservationId: generalFields.id.required(),
}).required();

export const updateStatusFinishedReservation = joi.object({
    reservationId: generalFields.id.required(),
}).required();
