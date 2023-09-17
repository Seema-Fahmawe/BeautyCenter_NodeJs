import mongoose, { Schema, Types, model } from "mongoose";

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'Owner',
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reservationId: {
        type: Types.ObjectId,
        ref: 'Reservation',
        required: true,
    }
}, {
    timestamps: true,
})

const reviewModel = mongoose.models.Review || model('Review', reviewSchema);
export default reviewModel;