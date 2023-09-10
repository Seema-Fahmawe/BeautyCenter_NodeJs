import { roles } from "../../middleware/auth.middleware.js";

export const endPoint = {
    getUsers: [roles.Admin],
    getAdmins: [roles.Admin],
    userDetails: [roles.Admin],
}