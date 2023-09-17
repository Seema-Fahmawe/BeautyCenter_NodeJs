import { Router } from "express";
import * as reservationController from './controller/reservation.controller.js';
import { auth } from "../../middleware/auth.middleware.js";
import { endPoint } from "./reservation.endPoints.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './reservation.validation.js';
const router = Router();

router.post('/createReservation', auth(endPoint.createReservation), validation(validators.createReservation),
    reservationController.createReservation);

router.patch('/delayReservation/:reservationId', auth(endPoint.delayReservation),
    validation(validators.delayReservation), reservationController.delayReservation);

router.patch('/canceleReservation/:reservationId', auth(endPoint.canceleReservation),
    validation(validators.canceleReservation), reservationController.canceleReservation);

router.get('/:ownerId/allReservation', auth(endPoint.allReservation), reservationController.getAllReservations);

router.get('/reservationDetails/:reservationId', auth(endPoint.reservationDetails),
    validation(validators.reservationDetails), reservationController.reservationDetails);

router.patch('/:reservationId/updateStatusFinishedReservation', validation(validators.updateStatusFinishedReservation),
    auth(endPoint.updateStatusFinishedReservation), reservationController.updateStatusFinishedReservation);
    
export default router;