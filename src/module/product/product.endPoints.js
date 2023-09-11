import { roles } from './../../middleware/auth.middleware.js';

export const endPoint = {
    createProduct: [roles.Owner],
    updateProduct: [roles.Owner],
    deleteCategory: [roles.Owner],
}