import { asyncHandler } from './../../../service/errorHandling.js';
import reservationModel from './../../../../DB/model/Reservations.model.js';
import reviewModel from '../../../../DB/model/Review.model.js';

export const createReview = asyncHandler(async (req, res, next) => {

    const { comment, rating } = req.body;
    const { ownerId } = req.params;
    const reservation = await reservationModel.findOne({ userId: req.user._id, ownerId });
    if (!reservation) {
        return next(new Error("can't review product before reserve it", { cause: 400 }));
    }
    const checkReview = await reviewModel.findOne({ createdBy: req.user._id, ownerId });
    if (checkReview) {
        return next(new Error('already review by you', { cause: 400 }));
    }
    const review = await reviewModel.create({ comment, rating, createdBy: req.user._id, ownerId, reservationId: reservation._id });
    return res.status(201).json({ message: 'success', review });
})

export const updateReview = asyncHandler(async (req, res, next) => {

    const { reviewId, ownerId } = req.params;
    const { comment, rating } = req.body;
    const review = await reviewModel.findOneAndUpdate({ _id: reviewId, ownerId, createdBy: req.user._id }, { comment, rating }, { new: true });
    if (!review) {
        return next(new Error('invalid review', { cause: 400 }));
    }
    return res.status(200).json({ message: 'success', review });
})

export const getAllReview = asyncHandler(async (req, res, next) => {

    const { ownerId } = req.params;
    const review = await reviewModel.find({ ownerId });
    return res.status(200).json({ message: 'success', review });
})