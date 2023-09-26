import mongoose, { Schema, Types, model } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
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
    like: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    unLike: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    isDeleted: {
        type: Boolean,
        default: false,
    },
    totalVote:{
        type:Number,
        default:0,
    },
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps:true,
})

postSchema.virtual('comments',{
    localField:'_id',
    foreignField:'postId',
    ref:'Comment'
})

const postModel = mongoose.models.Post || model('Post', postSchema);
export default postModel;