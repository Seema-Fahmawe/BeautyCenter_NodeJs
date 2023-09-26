import { Router } from 'express';
import * as postController from './controller/post.controller.js';
import fileUpload, { fileValidation } from '../../service/multer.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoint } from './post.endPoints.js';
import { validation } from '../../middleware/validation.js';
import * as validators from './post.validation.js';
import comment from '../comment/comment.router.js';
const router = Router({ mergeParams: true });

router.use('/:postId/comment', comment);
router.post('/createPost', auth(endPoint.createPost), fileUpload(fileValidation.image).single('image'),
    validation(validators.createPost), postController.createPost);

router.put('/updatePost/:postId', auth(endPoint.updatePost), fileUpload(fileValidation.image).single('image'),
    validation(validators.updatePost), postController.updatePost);

router.patch('/softDelete/:postId', auth(endPoint.softDelete), validation(validators.softDelete),
    postController.softDelete);

router.delete('/forceDelete/:postId', auth(endPoint.forceDelete), validation(validators.forceDelete),
    postController.forceDelete);

router.patch('/restorePost/:postId', auth(endPoint.restorePost), validation(validators.restorePost),
    postController.restorePost);

router.get('/:ownerId/allPosts', validation(validators.allPosts), postController.getAllPosts);

router.get('/:ownerId/softDeletePosts', validation(validators.softDeletePosts), postController.getSoftDeletePosts);

router.patch('/:postId/like', auth(endPoint.likePost), validation(validators.likePost), postController.likePost);

router.patch('/:postId/unLike', auth(endPoint.unLikePost), validation(validators.unLikePost),
    postController.unLikePost);

export default router;
