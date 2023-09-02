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
    }
}, {
    timestamps: true,
})

const ownerModel = mongoose.models.Owner || model('Owner', ownerSchema);
export default ownerModel;