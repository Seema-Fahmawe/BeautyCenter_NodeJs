import mongoose, { Schema, model } from "mongoose";

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
    }
}, {
    timestamps: true,
})
const userModel = mongoose.models.User || model('User', userSchema);
export default userModel;