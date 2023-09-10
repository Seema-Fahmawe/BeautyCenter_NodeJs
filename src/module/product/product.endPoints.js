import { roles } from './../../middleware/auth.middleware.js';

export const endPoint = {
    createProduct: [roles.Owner],
    updateCategory: [roles.Owner],
    deleteCategory: [roles.Owner],
}