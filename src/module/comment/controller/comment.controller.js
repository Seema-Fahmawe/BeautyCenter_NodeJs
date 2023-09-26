import commentModel from '../../../../DB/model/Comment.model.js';
import postModel from '../../../../DB/model/Post.model.js';
import cloudinary from '../../../service/cloudinary.js';
import { asyncHandler } from './../../../service/errorHandling.js';


export const createComment = asyncHandler(async (req, res, next) => {

    const { text } = req.body;
    const { postId } = req.params;
    if (!await postModel.findById(postId)) {
        return next(new Error(`invalid post id ${postId}`, { cause: 400 }));
    }
    if (req.file) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/comment` });
        req.body.image = { public_id, secure_url };
    }
    const comment = await commentModel.create({
        text, image: req.body.image, createdBy: req.user._id,
        updatedBy: req.user._id, postId
    });
    return res.status(201).json({ message: 'success', comment });
})

export const updateComment = asyncHandler(async (req, res, next) => {

    const comment = await commentModel.findById(req.params.commentId);
    if (!comment) {
        return next(new Error(`invalid comment id ${req.params.commentId}`, { cause: 400 }));
    }
    const { text } = req.body;
    if (text) {
        if (comment.text === text) {
            return next(new Error(`old text match new text`, { cause: 400 }));
        }
        comment.text = text;
    }
    if (req.file) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/comment` });
        await cloudinary.uploader.destroy(comment.image.public_id);
        comment.image = { public_id, secure_url };
    }
    comment.updatedBy = req.user._id;
    await comment.save();
    return res.status(201).json({ message: 'success', comment });
})

export const deleteComment = asyncHandler(async (req, res, next) => {
    const { commentId } = req.params;
    const comment = await commentModel.findOneAndDelete({ _id: commentId });
    if (!comment) {
        return next(new Error('comment not found', { cause: 400 }));
    }
    return res.status(200).json({ message: 'success' });
})

export const likeComment = asyncHandler(async (req, res, next) => {

    const { commentId } = req.params;
    const comment = await commentModel.findByIdAndUpdate(commentId, {
        $addToSet: { like: req.user?._id || req.owner?._id }, $pull: { unLike: req.user?._id || req.owner?._id }
    }, { new: true });
    if (!comment) {
        return next(new Error(`invalid comment id ${commentId}`, { cause: 400 }));
    }
    return res.status(201).json({ message: 'success', comment });
})

export const unLikeComment = asyncHandler(async (req, res, next) => {

    const { commentId } = req.params;
    const comment = await commentModel.findByIdAndUpdate(commentId, {
        $addToSet: { unLike: req.user._id || req.owner?._id }, $pull: { like: req.user._id || req.owner?._id  }
    }, { new: true });
    if (!comment) {
        return next(new Error(`invalid comment id ${commentId}`, { cause: 400 }));
    }
    return res.status(201).json({ message: 'success', comment });
})