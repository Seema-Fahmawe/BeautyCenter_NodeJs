import joi from 'joi';
import { generalFields } from './../../middleware/validation.js';

export const createPost = joi.object({
    title: joi.string().required(),
    caption: joi.string().required(),
    file: generalFields.file,
}).required();

export const updatePost = joi.object({
    postId: generalFields.id.required(),
    title: joi.string(),
    caption: joi.string(),
    file: generalFields.file,
}).required();

export const softDelete = joi.object({
    postId: generalFields.id.required(),
}).required();

export const forceDelete = joi.object({
    postId: generalFields.id.required(),
}).required();

export const restorePost = joi.object({
    postId: generalFields.id.required(),
}).required();

export const allPosts = joi.object({
    ownerId: generalFields.id.required(),
}).required();

export const softDeletePosts = joi.object({
    ownerId: generalFields.id.required(),
}).required();

export const likePost = joi.object({
    postId: generalFields.id.required(),
}).required();

export const unLikePost = joi.object({
    postId: generalFields.id.required(),
}).required();