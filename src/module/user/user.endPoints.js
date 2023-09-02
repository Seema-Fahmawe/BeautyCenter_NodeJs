import { roles } from "../../middleware/auth.middleware.js";

export const endPoint = {
    addSupervisorAdmin: [roles.Super_Admin],
    updateSupervisorAdmin:[roles.Super_Admin],
    deleteSupervisorAdmin:[roles.Super_Admin],
    getUsers: [roles.Super_Admin, roles.Supervisor_Admin],
    getAdmins: [roles.Super_Admin],
    userDetails: [roles.Super_Admin],
}