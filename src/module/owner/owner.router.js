import { Router } from "express";
import * as ownerController from './controller/owner.controller.js';
import { auth } from "../../middleware/auth.middleware.js";
import { endPoint } from "./owner.endPoints.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './owner.validation.js';
import coupon from '../coupon/coupon.router.js';
import review from '../review/review.router.js';
const router = Router({ mergeParams: true });

router.use('/:ownerId/coupon', coupon);
router.use('/:ownerId/review', review);
router.patch('/updateStatusOwner/:ownerId', auth(endPoint.updateStatus), validation(validators.updateStatusOwner), ownerController.updateStatusOwner);
router.get('/allOwners', auth(endPoint.getOwners), ownerController.getOwners);
router.get('/ownerDetails/:ownerId', auth(endPoint.ownerDetails), validation(validators.ownerDetails), ownerController.ownerDetails);
router.put('/updateOwner', auth(endPoint.updateOwner), validation(validators.updateOwner),
    ownerController.updateOwner);
router.delete('/deleteOwner/:ownerId', auth(endPoint.deleteOwner), validation(validators.deleteOwner),
    ownerController.deleteOwner);

router.get('/InfoCenter/:ownerId', auth(endPoint.getInfoCenter), validation(validators.getInfoCenter), ownerController.getInfoCenter);
router.get('/allCenters', auth(endPoint.getCenters), ownerController.getCenters);
export default router;