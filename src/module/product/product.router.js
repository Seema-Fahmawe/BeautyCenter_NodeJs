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

router.put('/updateProduct/:productId', auth(endPoint.updateProduct), fileUpload(fileValidation.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 20 },
]), validation(validators.updateProduct), productController.updateProduct);

router.patch('/softDelete/:productId', auth(endPoint.softDelete), validation(validators.softDelete),
    productController.softDelete);

router.delete('/forceDelete/:productId', auth(endPoint.forceDelete), validation(validators.forceDelete),
    productController.forceDelete);

router.patch('/restoreProduct/:productId', auth(endPoint.restoreProduct), validation(validators.restoreProduct),
    productController.restoreProduct);

router.get('/:ownerId/allProducts', validation(validators.allProducts), productController.getAllProducts);

router.get('/productDetails/:productId', validation(validators.productDetails), productController.productDetails);

router.get('/:ownerId/softDeleteProducts', validation(validators.softDeleteProducts), productController.getSoftDeleteProducts);

export default router;