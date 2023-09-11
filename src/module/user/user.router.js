import { Router } from "express";
import * as userController from './controller/user.controller.js';
import { auth, roles } from "../../middleware/auth.middleware.js";
import fileUpload, { fileValidation } from "../../service/multer.js";
import { endPoint } from "./user.endPoints.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './user.validaton.js';
const router = Router();

router.patch('/profilePic', auth(Object.values(roles)), fileUpload(fileValidation.image).single('image'),
    validation(validators.profilePic), userController.profilePic);

router.get('/allUsers', auth(endPoint.getUsers), userController.getUsers);

router.get('/:userId/userDetails', auth(endPoint.userDetails), validation(validators.userDetails),
    userController.getSpecificUser);

router.patch('/updatePassword', auth(Object.values(roles)), validation(validators.updatePassword),
    userController.updatePassword);

router.delete('/deleteUser/:userId', auth(endPoint.deleteUser), validation(validators.deleteUser),
    userController.deleteUser);
export default router;