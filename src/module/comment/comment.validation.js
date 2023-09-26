import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const createComment = joi.object({
    text: joi.string().required(),
    postId: generalFields.id.required(),
    file: generalFields.file,
}).required();

export const updateComment = joi.object({
    text: joi.string(),
    commentId: generalFields.id.required(),
    file: generalFields.file,
}).required();

export const deleteComment = joi.object({
    commentId: generalFields.id.required(),
}).required();

export const likeComment = joi.object({
    commentId: generalFields.id.required(),
}).required();

export const unLikeComment = joi.object({
    commentId: generalFields.id.required(),
}).required();