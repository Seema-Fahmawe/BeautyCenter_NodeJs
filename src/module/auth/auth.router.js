import { Router } from "express";
import * as authController from './controller/auth.controller.js';
import * as validators from './auth.validation.js';
import { validation } from "../../middleware/validation.js";
import fileUpload, { fileValidation } from "../../service/multer.js";
const router = Router();

router.post('/signup', fileUpload(fileValidation.image).single('image'), validation(validators.signup),
    authController.signup);
router.get('/confirmEmail/:token', validation(validators.token), authController.confirmEmail);
router.get('/newConfirmEmail/:token', validation(validators.token), authController.newConfirmEmail);
router.post('/signin', validation(validators.signin), authController.signin);
router.patch('/sendCode', validation(validators.sendCode), authController.sendCode);
router.patch('/forgetPassword', validation(validators.forgetPassword), authController.forgetPassword);
router.post('/signupOwner', fileUpload(fileValidation.image).single('image'),
    validation(validators.signupOwner), authController.signupOwner);
export default router;