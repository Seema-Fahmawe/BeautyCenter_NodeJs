import { Router } from 'express';
import * as commentController from './controller/comment.controller.js';
import fileUpload, { fileValidation } from '../../service/multer.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoint } from './comment.endPoints.js';
import { validation } from '../../middleware/validation.js';
import * as validators from './comment.validation.js';
const router = Router({ mergeParams: true });

router.post('/createComment', auth(endPoint.createComment), fileUpload(fileValidation.image).single('image'),
    validation(validators.createComment), commentController.createComment);

router.put('/updateComment/:commentId', auth(endPoint.updateComment), fileUpload(fileValidation.image).single('image'),
    validation(validators.updateComment), commentController.updateComment);

router.delete('/deleteComment/:commentId', auth(endPoint.deleteComment), validation(validators.deleteComment),
    commentController.deleteComment);

router.patch('/:commentId/like', auth(endPoint.likeComment), validation(validators.likeComment),
    commentController.likeComment);

router.patch('/:commentId/unLike', auth(endPoint.unLikeComment), validation(validators.unLikeComment),
    commentController.unLikeComment);
export default router;
