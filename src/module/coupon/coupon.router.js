import { Router } from "express";
import * as couponController from './controller/coupon.controller.js';
import { auth } from "../../middleware/auth.middleware.js";
import { endPoint } from "./coupon.endPoints.js";
import fileUpload, { fileValidation } from "../../service/multer.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './coupon.validation.js';
const router = Router();

router.post('/createCoupon', auth(endPoint.createCoupon), fileUpload(fileValidation.image).single('image'),
    validation(validators.createCoupon), couponController.createCoupon);

router.put('/updateCoupon/:couponId', auth(endPoint.updateCoupon), validation(validators.updateCoupon),
    couponController.updateCoupon);

router.get('/allCoupons', couponController.getAllCoupon);
router.get('/couponDetails/:couponId', validation(validators.couponDetails), couponController.couponDetails);

export default router;