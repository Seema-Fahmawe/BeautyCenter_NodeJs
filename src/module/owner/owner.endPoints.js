import { roles } from './../../middleware/auth.middleware.js';

export const endPoint = {
    updateStatus: [roles.Super_Admin, roles.Supervisor_Admin],
}