import { Router } from "express";
import * as wishlistController from './controller/wishlist.controller.js';
import { auth } from "../../middleware/auth.middleware.js";
import { endPoint } from "./wishlist.endPoints.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './wishlist.validation.js';
const router = Router();

router.post('/createWishlist', auth(endPoint.createWishlist), validation(validators.createWishlist),
    wishlistController.createWishlist);

router.patch('/deleteItem', auth(endPoint.deleteItem), validation(validators.deleteItem),
    wishlistController.deleteItem);

router.patch('/clearWishlist', auth(endPoint.clearWishlist), wishlistController.clearWishlist);
router.get('/', auth(endPoint.getWishlist), wishlistController.getWishlist);

export default router;
