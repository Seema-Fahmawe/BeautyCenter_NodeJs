import postModel from '../../../../DB/model/Post.model.js';
import { asyncHandler } from './../../../service/errorHandling.js';
import cloudinary from './../../../service/cloudinary.js';

export const createPost = asyncHandler(async (req, res, next) => {
    const { title, caption } = req.body;
    if (await postModel.findOne({ title, createdBy: req.owner._id })) {
        return next(new Error(`Duplicate post title`, { cause: 409 }));
    }
    if (req.file) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/post` });
        req.body.image = { public_id, secure_url };
    }
    const post = await postModel.create({ title, caption, image: req.body.image, createdBy: req.owner._id, updatedBy: req.owner._id });
    return res.status(201).json({ message: 'success', post });
})

export const updatePost = asyncHandler(async (req, res, next) => {

    const post = await postModel.findById(req.params.postId);
    if (!post) {
        return next(new Error(`invalid post id ${req.params.postId}`, { cause: 400 }));
    }
    const { title, caption } = req.body;
    if (title) {
        if (post.title === title) {
            return next(new Error(`old title match new title`, { cause: 400 }));
        }
        if (await postModel.findOne({ title, createdBy: req.owner._id })) {
            return next(new Error(`Duplicate post title`, { cause: 400 }));
        }
        post.title = title;
    }
    if (caption) {
        post.caption = caption;
    }
    if (req.file) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/post` });
        await cloudinary.uploader.destroy(post.image.public_id);
        post.image = { public_id, secure_url };
    }
    post.updatedBy = req.owner._id;
    await post.save();
    return res.status(201).json({ message: 'success', post });
})

export const softDelete = asyncHandler(async (req, res, next) => {

    const { postId } = req.params;
    const post = await postModel.findOneAndUpdate({ _id: postId, isDeleted: false },
        { isDeleted: true }, { new: true });
    if (!post) {
        return next(new Error('post not found', { cause: 400 }));
    }
    return res.status(200).json({ message: 'success', post });
})

export const forceDelete = asyncHandler(async (req, res, next) => {

    const { postId } = req.params;
    const post = await postModel.findOneAndDelete({ _id: postId, isDeleted: true });
    if (!post) {
        return next(new Error('post not found', { cause: 400 }));
    }
    return res.status(200).json({ message: 'success' });
})

export const restorePost = asyncHandler(async (req, res, next) => {

    const { postId } = req.params;
    const post = await postModel.findOneAndUpdate({ _id: postId, isDeleted: true },
        { isDeleted: false }, { new: true });
    if (!post) {
        return next(new Error('post not found', { cause: 400 }));
    }
    return res.status(200).json({ message: 'success', post });
})

export const getAllPosts = asyncHandler(async (req, res, next) => {

    const posts = await postModel.find({ createdBy: req.params.ownerId }).populate('comments');
    return res.status(200).json({ message: 'success', posts });
})

export const getSoftDeletePosts = asyncHandler(async (req, res, next) => {

    const posts = await postModel.find({ isDeleted: true, createdBy: req.params.ownerId });
    return res.status(201).json({ message: 'success', posts });
})

export const likePost = asyncHandler(async (req, res, next) => {

    const { postId } = req.params;
    const post = await postModel.findByIdAndUpdate(postId, {
        $addToSet: { like: req.user._id }, $pull: { unLike: req.user._id }
    }, { new: true });
    if (!post) {
        return next(new Error(`invalid post id ${postId}`, { cause: 400 }));
    }
    post.totalVote = post.like.length - post.unLike.length;
    await post.save();
    return res.status(201).json({ message: 'success', post });
})

export const unLikePost = asyncHandler(async (req, res, next) => {

    const { postId } = req.params;
    const post = await postModel.findByIdAndUpdate(postId, {
        $addToSet: { unLike: req.user._id }, $pull: { like: req.user._id }
    }, { new: true });
    if (!post) {
        return next(new Error(`invalid post id ${postId}`, { cause: 400 }));
    }
    post.totalVote = post.like.length - post.unLike.length;
    await post.save();
    return res.status(201).json({ message: 'success', post });
})
