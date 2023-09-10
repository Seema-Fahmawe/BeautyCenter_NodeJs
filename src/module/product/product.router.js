import { Router } from "express";
import * as productController from './controller/product.controller.js';
import { auth } from "../../middleware/auth.middleware.js";
import { endPoint } from "./product.endPoints.js";
import fileUpload, { fileValidation } from "../../service/multer.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './product.validation.js';
const router = Router();

router.post('/createProduct', auth(endPoint.createProduct), fileUpload(fileValidation.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 20 },
]), validation(validators.createProduct), productController.createProduct);

export default router;