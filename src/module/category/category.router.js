import { Router } from "express";
import * as categoryController from './controller/category.controller.js';
import fileUpload, { fileValidation } from "../../service/multer.js";
import { auth, roles } from "../../middleware/auth.middleware.js";
import { endPoint } from "./category.endPoints.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './category.validation.js';
import subcategoryRouter from '../subcategory/subcategory.router.js';
const router = Router();

router.use('/:categoryId', subcategoryRouter);
router.post('/createCategory', auth(endPoint.createCategory), fileUpload(fileValidation.image).single('image'),
    validation(validators.createCategory), categoryController.createCategory);

router.put('/updateCategory/:categoryId', auth(endPoint.updateCategory), fileUpload(fileValidation.image).single('image'),
    validation(validators.updateCategory), categoryController.updateCategory);

router.get('/allCategory', categoryController.getAllCategory);
router.get('/categoryDetails/:categoryId', validation(validators.categoryDetails), categoryController.categoryDetails);

router.delete('/deleteCategory/:categoryId', auth(endPoint.deleteCategory), validation(validators.deleteCategory), categoryController.deleteCategory);
router.get('/:categoryId/products', validation(validators.getProducts), categoryController.getProducts);

export default router;