import { Router } from 'express';
import * as reviewController from './controller/review.controller.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoint } from './review.endPoints.js';
import { validation } from '../../middleware/validation.js';
import * as validators from './review.validation.js';
const router = Router({mergeParams:true});

router.post('/createReview', auth(endPoint.createReview), validation(validators.createReview),
    reviewController.createReview);

router.put('/updateReview/:reviewId', auth(endPoint.updateReview),
    validation(validators.updateReview), reviewController.updateReview);

router.get('/getAllReview', validation(validators.getAllReview), reviewController.getAllReview);

export default router;
