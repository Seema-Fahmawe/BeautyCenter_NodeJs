import couponModel from '../../../../DB/model/Coupon.model.js';
import { asyncHandler } from './../../../service/errorHandling.js';

export const createCoupon = asyncHandler(async (req, res, next) => {

    const { name, expireDate, amount } = req.body;
    if (await couponModel.findOne({ name,createdBy: req.owner._id })) {
        return next(new Error(`Duplicate coupon name`, { cause: 409 }));
    }
    let date = new Date(expireDate);
    const now = new Date();
    if (now.getTime() > date.getTime()) {
        return next(new Error('invalid date', { cause: 400 }));
    }

    date = date.toLocaleDateString();
    const coupon = await couponModel.create({
        name, createdBy: req.owner._id, updatedBy: req.owner._id, expireDate: date, amount
    });
    return res.status(201).json({ message: 'success', coupon });
})

export const updateCoupon = asyncHandler(async (req, res, next) => {

    const coupon = await couponModel.findById(req.params.couponId);
    if (!coupon) {
        return next(new Error(`invalid coupon id ${req.params.couponId}`, { cause: 400 }));
    }
    const name = req.body.name?.toLowerCase();
    if (name) {
        if (coupon.name === name) {
            return next(new Error(`old name match new name`, { cause: 400 }));
        }
        if (await couponModel.findOne({ name,createdBy: req.owner._id })) {
            return next(new Error(`Duplicate coupon name`, { cause: 400 }));
        }
        coupon.name = name;
    }
    if (req.body.expireDate) {
        let date = new Date(req.body.expireDate);
        const now = new Date();
        if (now.getTime() > date.getTime()) {
            return next(new Error('invalid date', { cause: 400 }));
        }
        date = date.toLocaleDateString();
        coupon.expireDate = date;
    }
    if (req.body.amount) {
        coupon.amount = req.body.amount;
    }
    coupon.updatedBy = req.owner._id;
    await coupon.save();
    return res.status(201).json({ message: 'success', coupon });
})

export const getAllCoupon = asyncHandler(async (req, res, next) => {

    const coupons = await couponModel.find({ createdBy: req.params.ownerId });
    return res.status(200).json({ message: 'success', coupons });
})

export const couponDetails = asyncHandler(async (req, res, next) => {

    const { couponId, ownerId } = req.params;
    const coupon = await couponModel.findOne({ createdBy: ownerId, _id: couponId });
    return res.status(200).json({ message: 'success', coupon });
})