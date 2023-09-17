import mongoose, { Schema, model } from "mongoose";

const ownerSchema = new Schema({
    centerName: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
    },
    status: {
        type: String,
        default: 'deactivated',
        enum: ['actived', 'deactivated']
    },
    forgetCode: {
        type: String,
        default: null,
    },
    changePasswordTime: {
        type: Date,
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: 'Owner',
    },
    gender: {
        type: String,
        default: 'Female',
        enum: ['Male', 'Female']
    },
    workDays: {
        type: [{ type: String }],
        default: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
        enum: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    startTimeWork: {
        type: String,
        default: "09:00:00",
    },
    endTimeWork: {
        type: String,
        default: "20:00:00",
    }
}, {
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps: true,
})

ownerSchema.virtual('coupons', {
    localField: '_id',
    foreignField: 'createdBy',
    ref: 'Coupon'
})

ownerSchema.virtual('reviews',{
    localField:'_id',
    foreignField:'ownerId',
    ref:'Review',
})

const ownerModel = mongoose.models.Owner || model('Owner', ownerSchema);
export default ownerModel;