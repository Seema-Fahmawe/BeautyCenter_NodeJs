import { roles } from "../../middleware/auth.middleware.js";

export const endPoint = {
    createCategory: [roles.Owner],
    updateCategory: [roles.Owner],
    deleteCategory: [roles.Owner],
}