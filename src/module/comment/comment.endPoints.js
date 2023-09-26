import { roles } from "../../middleware/auth.middleware.js";

export const endPoint={
    createComment:[roles.User],
    updateComment:[roles.User],
    deleteComment:[roles.User],
    likeComment:[roles.User,roles.Owner],
    unLikeComment:[roles.User,roles.Owner],
}