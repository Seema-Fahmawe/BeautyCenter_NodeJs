import { Router } from "express";
import * as subcategoryController from './controller/subcategory.controller.js';
import { auth } from "../../middleware/auth.middleware.js";
import { endPoint } from "./subcategory.endPoints.js";
import fileUpload, { fileValidation } from "../../service/multer.js";
import * as validators from './subcategory.validation.js';
import { validation } from "../../middleware/validation.js";

const router = Router({ mergeParams: true });

router.post('/createSubcategory', auth(endPoint.createSubcategory), fileUpload(fileValidation.image).single('image'),
    validation(validators.createSubcategory), subcategoryController.createSubcategory);

router.put('/updateSubcategory/:subcategoryId', auth(endPoint.createSubcategory), fileUpload(fileValidation.image).single('image'),
    validation(validators.updateSubcategory), subcategoryController.updateSubcategory);

router.get('/specificSubcategory', validation(validators.specificSubcategory),
    subcategoryController.getSpecificSubcategory);

router.get('/allSubcategories', subcategoryController.getAllSubcategories);

router.get('/:subcategoryId/products', validation(validators.getProducts), subcategoryController.getProducts);

export default router;