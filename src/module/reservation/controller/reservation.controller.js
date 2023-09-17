import moment from 'moment';
import reservationModel from '../../../../DB/model/Reservations.model.js';
import { asyncHandler } from './../../../service/errorHandling.js';
import ownerModel from '../../../../DB/model/Owner.model.js';
import productModel from './../../../../DB/model/Product.model.js';
import couponModel from './../../../../DB/model/Coupon.model.js';

export const createReservation = asyncHandler(async (req, res, next) => {

    let { date, products, centerName, couponName, status } = req.body;
    const center = await ownerModel.findOne({ centerName: centerName.toLowerCase() });
    if (!center) {
        return next(new Error(`invalid center ${centerName}`, { cause: 400 }));
    }

    if (couponName) {
        const coupon = await couponModel.findOne({ name: couponName.toLowerCase(), createdBy: center._id });
        if (!coupon) {
            return next(new Error(`invalid coupon ${couponName}`, { cause: 400 }));
        }
        let now = moment();
        let parsed = moment(coupon.expireDate, 'DD/MM/YYYY');
        let diff = now.diff(parsed, 'days');
        if (diff >= 0) {
            return next(new Error('coupon is expired', { cause: 400 }));
        }
        if (coupon.usedBy.includes(req.user._id)) {
            return next(new Error(`coupon already used by ${req.user._id}`, { cause: 400 }));
        }
        req.body.coupon = coupon;
    }

    const productIds = [];
    const finalProductList = [];
    let totalPrice = 0;
    for (const product of products) {
        const checkProduct = await productModel.findOne({ _id: product.productId, isDeleted: false, createdBy: center._id });
        if (!checkProduct) {
            return next(new Error('invalid service', { cause: 400 }));
        }
        product.finalPrice = checkProduct.finalPrice;
        product.name = checkProduct.name;
        product.description = checkProduct.description;
        totalPrice += product.finalPrice;
        productIds.push(product.productId);
        finalProductList.push(product);
    }
    req.body.products = finalProductList;

    let now = moment();
    let parsed = moment(date, 'DD/MM/YYYY hh:mm:ss');
    let diff = now.diff(parsed, 'hours');
    if (diff >= 0) {
        return next(new Error('invalid date', { cause: 400 }));
    }
    const checkReservation = await reservationModel.findOne({ date });
    if (checkReservation) {
        return next(new Error(`That time is reserved`, { cause: 400 }));
    }
    let bookDay = moment(parsed).utcOffset(10 * 60).format();
    bookDay = moment(bookDay).format("dddd");
    let bookTime = moment(parsed).format("HH:mm:ss");

    if (center.workDays.includes(bookDay)) {
        if (bookTime > center.startTimeWork && bookTime < center.endTimeWork) {
            req.body.date = date;
        } else {
            return next(new Error('The center is not working at this time', { cause: 400 }));
        }
    } else {
        return next(new Error('The center is not working at this day', { cause: 400 }));
    }

    const reservation = await reservationModel.create({
        userId: req.user._id,
        ownerId: center._id,
        products,
        status,
        couponId: req.body.coupon?._id,
        date: req.body.date,
        finalPrice: totalPrice - (totalPrice * ((req.body.coupon?.amount || 0) / 100))
    })

    if (req.body.coupon) {
        await couponModel.updateOne({ _id: req.body.coupon._id }, { $addToSet: { usedBy: req.user._id } });
    }
    return res.status(201).json({ message: 'success', reservation });
})

export const updateReservedProducts = asyncHandler(async (req, res, next) => {

    const { reservationId } = req.params;
    let { products } = req.body;
    const reservation = await reservationModel.findOne({ _id: reservationId, userId: req.user._id });
    if (!reservation) {
        return next(new Error('invalid reservation', { cause: 400 }));
    }
    const productIds = [];
    const finalProductList = [];
    let totalPrice = 0;
    for (const product of products) {
        const checkProduct = await productModel.findOne({ _id: product.productId, isDeleted: false, createdBy: reservation.ownerId });
        if (!checkProduct) {
            return next(new Error('invalid service', { cause: 400 }));
        }
        product.finalPrice = checkProduct.finalPrice;
        product.name = checkProduct.name;
        product.description = checkProduct.description;
        totalPrice += product.finalPrice;
        productIds.push(product.productId);
        finalProductList.push(product);
    }
    req.body.products = finalProductList;
    reservation.products = products;
    await reservation.save();
    return res.status(200).json({ message: 'success', reservation });
})

export const delayReservation = asyncHandler(async (req, res, next) => {

    const { reservationId } = req.params;
    const { date } = req.body;

    const reservation = await reservationModel.findOne({ _id: reservationId, userId: req.user._id });
    if (!reservation) {
        return next(new Error('invalid reservation', { cause: 400 }));
    }
    const checkDate = await reservationModel.findOne({ date });
    if (checkDate) {
        return next(new Error(`That time is reserved`, { cause: 400 }));
    }
    const center = await ownerModel.findOne({ _id: reservation.ownerId });
    if (!center) {
        return next(new Error(`invalid center `, { cause: 400 }));
    }
    let now = moment();
    let parsed = moment(date, 'DD/MM/YYYY hh:mm:ss');
    let diff = now.diff(parsed, 'hours');
    if (diff >= 0) {
        return next(new Error('invalid date', { cause: 400 }));
    }
    let bookDay = moment(parsed).utcOffset(10 * 60).format();
    bookDay = moment(bookDay).format("dddd");
    let bookTime = moment(parsed).format("HH:mm:ss");

    if (center.workDays.includes(bookDay)) {
        if (bookTime > center.startTimeWork && bookTime < center.endTimeWork) {
            req.body.date = date;
        } else {
            return next(new Error('The center is not working at this time', { cause: 400 }));
        }
    } else {
        return next(new Error('The center is not working at this day', { cause: 400 }));
    }
    reservation.date = date;
    reservation.status = 'delayed';
    await reservation.save();
    return res.status(200).json({ message: 'success', reservation });
})

export const canceleReservation = asyncHandler(async (req, res, next) => {

    const { reservationId } = req.params;
    const reservation = await reservationModel.findOne({ _id: reservationId, userId: req.user._id });
    if (!reservation) {
        return next(new Error('invalid reservation', { cause: 400 }));
    }
    reservation.status = 'cancele';
    reservation.date = "invalid date";
    await reservation.save();
    return res.status(200).json({ message: 'success', reservation });
})

export const getAllReservations = asyncHandler(async (req, res, next) => {

    const reservations = await reservationModel.find({ ownerId: req.owner._id });
    return res.status(200).json({ message: 'success', reservations });
})

export const reservationDetails = asyncHandler(async (req, res, next) => {

    const { reservationId } = req.params;
    const reservation = await reservationModel.findOne({ _id: reservationId, ownerId: req.owner._id });
    return res.status(200).json({ message: 'success', reservation });
})

export const updateStatusFinishedReservation = asyncHandler(async (req, res, next) => {

    const { reservationId } = req.params;
    const reservation = await reservationModel.findByIdAndUpdate({ _id: reservationId, ownerId: req.owner._id }, { status: 'finished' }, { new: true });
    return res.status(200).json({ message: 'success', reservation });
})
