import mongoose, { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
    },
    image: {
        type: Object,
    },
    status: {
        type: String,
        default: 'actived',
        enum: ['actived', 'deactivated']
    },
    forgetCode: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin']
    },
    changePasswordTime: {
        type: Date,
    },
    gender: {
        type: String,
        default: 'Female',
        enum: ['Male', 'Female']
    },
}, {
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps: true,
})

userSchema.virtual('wishlist',{
    localField:'_id',
    foreignField:'userId',
    ref:'Wishlist',
})

const userModel = mongoose.models.User || model('User', userSchema);
export default userModel;