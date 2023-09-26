import mongoose, { Schema, Types, model } from "mongoose";

const reservationSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        productId: { type: Types.ObjectId, ref: 'Product', required: true },
        name: { type: String },
        description: { type: String },
        finalPrice: { type: Number },
    }],
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'actived',
        enum: ['canceled', 'delayed', 'actived','finished']
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'Owner',
        required: true,
    },
    couponId: {
        type: Types.ObjectId,
        ref: 'Coupon',
    },
    finalPrice: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
})

const reservationModel = mongoose.models.Reservation || model('Reservation', reservationSchema);
export default reservationModel;