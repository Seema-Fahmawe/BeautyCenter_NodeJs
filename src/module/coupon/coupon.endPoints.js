import { roles } from "../../middleware/auth.middleware.js";

export const endPoint = {
    createCoupon: [roles.Owner],
    updateCoupon: [roles.Owner],
}