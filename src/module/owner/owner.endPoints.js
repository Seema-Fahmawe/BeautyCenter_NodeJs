import { roles } from './../../middleware/auth.middleware.js';

export const endPoint = {
    updateStatus: [roles.Admin],
}