import mongoose, { Schema, Types, model } from "mongoose";

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    postId: {
        type: Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    image: {
        type: Object,
    },
    like: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    unLike: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
})

const commentModel = mongoose.models.Comment || model('Comment', commentSchema);
export default commentModel;