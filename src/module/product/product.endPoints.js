import { roles } from './../../middleware/auth.middleware.js';

export const endPoint = {
    createProduct: [roles.Owner],
    updateProduct: [roles.Owner],
    softDelete: [roles.Owner],
    forceDelete: [roles.Owner],
    restoreProduct:[roles.Owner],
}