import { roles } from "../../middleware/auth.middleware.js";

export const endPoint = {
    getUsers: [roles.Owner],
    userDetails: [roles.Owner],
    deleteUser:[roles.Owner],
}