import { roles } from './../../middleware/auth.middleware.js';

export const endPoint = {
    createReservation: [roles.User],
    updateReservedProducts: [roles.User],
    delayReservation: [roles.User],
    canceleReservation:[roles.User],
    allReservation:[roles.Owner],
    reservationDetails:[roles.Owner],
    updateStatusFinishedReservation:[roles.Owner],
}