import { Router } from "express";
import * as ownerController from './controller/owner.controller.js';
import { auth } from "../../middleware/auth.middleware.js";
import { endPoint } from "./owner.endPoints.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './owner.validation.js';
const router = Router();

router.patch('/updateStatusOwner/:ownerId', auth(endPoint.updateStatus), validation(validators.updateStatusOwner), ownerController.updateStatusOwner);
router.get('/allOwners', auth(endPoint.getOwners), ownerController.getOwners);
router.get('/ownerDetails/:ownerId', auth(endPoint.ownerDetails), validation(validators.ownerDetails), ownerController.ownerDetails);
router.put('/updateOwner', auth(endPoint.updateOwner), validation(validators.updateOwner),
    ownerController.updateOwner);
router.delete('/deleteOwner/:ownerId', auth(endPoint.deleteOwner), validation(validators.deleteOwner),
    ownerController.deleteOwner);
export default router;