import { roles } from './../../middleware/auth.middleware.js';

export const endPoint = {
    createSubcategory: [roles.Owner],
    updateSubcategory:[roles.Owner],
}