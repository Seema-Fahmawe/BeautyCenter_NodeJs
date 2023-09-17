import mongoose, { Schema, Types, model } from "mongoose";

const couponSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    expireDate: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
    },
    usedBy: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    amount: {
        type: Number,
        default: 1,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'Owner',
        required: true,
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'Owner',
        required: true,
    },
}, {
    timestamps: true,
})

const couponModel = mongoose.models.Coupon || model('Coupon', couponSchema);
export default couponModel;