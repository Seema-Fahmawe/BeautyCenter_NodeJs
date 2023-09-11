import { roles } from './../../middleware/auth.middleware.js';

export const endPoint = {
    updateStatus: [roles.Admin],
    getOwners: [roles.Admin],
    ownerDetails: [roles.Admin],
    updateOwner: [roles.Owner],
}