import { roles } from "../../middleware/auth.middleware.js";

export const endPoint={
    createPost:[roles.Owner],
    updatePost:[roles.Owner],
    softDelete:[roles.Owner],
    forceDelete:[roles.Owner],
    restorePost:[roles.Owner],
    likePost:[roles.User],
    unLikePost:[roles.User],
}