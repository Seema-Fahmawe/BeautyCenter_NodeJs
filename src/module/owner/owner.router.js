import { Router } from "express";
import * as ownerController from './controller/owner.controller.js';
import { auth } from "../../middleware/auth.middleware.js";
import { endPoint } from "./owner.endPoints.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './owner.validation.js';
const router = Router();

router.patch('/updateStatusOwner/:ownerId', auth(endPoint.updateStatus), validation(validators.updateStatusOwner), ownerController.updateStatusOwner);
router.get('/allOwners', ownerController.getOwners);
router.get('/ownerDetails/:ownerId', validation(validators.ownerDetails), ownerController.ownerDetails);

export default router;