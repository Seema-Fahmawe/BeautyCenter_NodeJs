import { roles } from "../../middleware/auth.middleware.js";

export const endPoint = {
    createWishlist: [roles.User],
    deleteItem:[roles.User],
    clearWishlist:[roles.User],
    getWishlist :[roles.User],
}