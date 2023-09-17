import { roles } from "../../middleware/auth.middleware.js";

export const endPoint={
    createReview:[roles.User],
    updateReview:[roles.User],
}