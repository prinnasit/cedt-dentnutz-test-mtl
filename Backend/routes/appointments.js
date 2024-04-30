const express = require('express');

/**
  * @swagger
  *   /appointments:
  *   get:
  *     tags:
  *       - appointment
  *     security:
  *       - bearerAuth: []
  *     summary: Retrieve appointments based on user role and ID
  *     operationId: getAppointments
  *     responses:
  *       '200':
  *         description: Appointments retrieved successfully
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   description: Indicates if the request was successful
  *                   example: true
  *                 count:
  *                   type: integer
  *                   description: Number of appointments retrieved
  *                   example: 1
  *                 data:
  *                   type: array
  *                   description: Array of appointments
  *                   items:
  *                     $ref: '#/components/schemas/Appointment'
  *       '402':
  *         description: Not authorized to access this route
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   description: Indicates if the request was unsuccessful
  *                   example: false
  *                 message:
  *                   type: string
  *                   description: Error message
  *                   example: "Not authorize to access this route"
  *       '500':
  *         description: Internal server error - unable to retrieve appointments
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   description: Indicates if the request was unsuccessful
  *                   example: false
  *                 message:
  *                   type: string
  *                   description: Error message
  *                   example: "Cannot find Appointment"
  *       '404':
  *         description: Appointment not found
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   description: Indicates if the request was successful
  *                   example: false
  *                 message:
  *                   type: string
  *                   description: Error message detailing the missing appointment
  *                   example: "No appointment with the id of ${req.params.id}"
  */


/**
 * @swagger
 *  paths:
*   /appointments/{id}:
*     put:
*       tags:
*         - appointment
*       security:
*         - bearerAuth: []
*       summary: Update appointment
*       description: Updates details of an existing appointment.
*       parameters:
*         - in: path
*           name: id
*           required: true
*           schema:
*             type: string
*           description: ID of the appointment to update.
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 appDate:
*                   type: string
*                   format: date-time
*                   description: New date and time of the appointment.
*                 dentist:
*                   type: string
*                   format: uuid
*                   description: ID of the dentist for the updated appointment.
*                 finished:
*                   type: boolean
*                   description: Indicates if the appointment has been completed.
*       responses:
*         '200':
*           description: Successful response. Returns the updated appointment.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Appointment'
*         '400':
*           description: Bad request. Indicates a validation error or conflicting appointments.
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     description: Indicates if the request was successful.
*                   message:
*                     type: string
*                     description: Error message indicating the reason for the bad request.
*         '401':
*           description: Unauthorized. User is not authorized to update this appointment.
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     description: Indicates if the request was successful.
*                   message:
*                     type: string
*                     description: Error message indicating lack of authorization.
*         '404':
*           description: Appointment not found.
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     description: Indicates if the request was successful.
*                   message:
*                     type: string
*                     description: Error message indicating that the appointment was not found.
*         '418':
*           description: I'm a teapot. Indicates that the appointment date cannot be in the past.
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     description: Indicates if the request was successful.
*                   message:
*                     type: string
*                     description: Error message indicating that the appointment date cannot be in the past.
*         '500':
*           description: Internal Server Error. Failed to update appointment.
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     description: Indicates if the request was successful.
*                   message:
*                     type: string
*                     description: Error message indicating failure to update appointment.
 */


/**
 * @swagger
 *  openapi: 3.0.0
* info:
*   title: Appointment API
*   version: 1.0.0
* paths:
*   /dentists/{dentistId}/appointments:
*     post:
*       tags:
*         - appointment
*       security:
*         - bearerAuth: []
*       summary: Add appointment
*       description: Creates a new appointment for a specific dentist.
*       parameters:
*         - in: path
*           name: dentistId
*           required: true
*           schema:
*             type: string
*           description: ID of the dentist for whom the appointment is being added.
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 appDate:
*                   type: string
*                   format: date-time
*                   description: Date and time of the appointment.
*       responses:
*         '200':
*           description: Successful response. Returns the created appointment.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Appointment'
*         '400':
*           description: Bad request. Indicates a validation error or existing active appointment.
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     description: Indicates if the request was successful.
*                   message:
*                     type: string
*                     description: Error message indicating the reason for the bad request.
*         '404':
*           description: Not found. Indicates that the specified dentist does not exist.
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
 */


/**
 * @swagger
* paths:
*   /appointments/{id}:
*     get:
*       tags:
*         - appointment
*       security:
*         - bearerAuth: []
*       summary: Get single appointment
*       description: Retrieves details of a single appointment by its ID.
*       parameters:
*         - in: path
*           name: id
*           required: true
*           schema:
*             type: string
*           description: ID of the appointment to retrieve.
*       responses:
*         '200':
*           description: Successful response. Returns the appointment details.
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     description: Indicates if the request was successful.
*                   data:
*                     $ref: '#/components/schemas/Appointment'
*         '401':
*           description: Unauthorized. User is not authorized to view this appointment.
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     description: Indicates if the request was successful.
*                   message:
*                     type: string
*                     description: Error message indicating lack of authorization.
*         '404':
*           description: Appointment not found.
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     description: Indicates if the request was successful.
*                   message:
*                     type: string
*                     description: Error message indicating that the appointment was not found.
*         '500':
*           description: Internal Server Error. Failed to retrieve appointment details.
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     description: Indicates if the request was successful.
*                   message:
*                     type: string
*                     description: Error message indicating failure to retrieve appointment details.
* 
*/

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     tags:
 *       - appointment
 *     security:
 *       - bearerAuth: []
 *     summary: Delete an appointment
 *     description: Deletes an appointment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the appointment to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: {}
 *       '400':
 *         description: Appointment is in progress
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: This appointment is in progress
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User is not authorized to delete this appointment
 *       '404':
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No appointment with the provided ID found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Cannot delete Appointment
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     Dentist:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the dentist.
 *           maxLength: 50
 *         yearsOfExperience:
 *           type: string
 *           description: The years of experience of the dentist.
 *         areaOfExpertise:
 *           type: string
 *           description: The area of expertise of the dentist.
 *         picture:
 *           type: string
 *           description: The link to the dentist's picture.
 *       required:
 *         - name
 *         - yearsOfExperience
 *         - areaOfExpertise
 *         - picture
 *       xml:
 *         name: Dentist
 *     Report:
 *       type: object
 *       required:
 *         - patientId
 *         - dentistId
 *         - appointmentId
 *         - treatment
 *         - prescribed_medication
 *         - recommendations
 *         - date
 *       properties:
 *         patientId:
 *           type: string
 *           format: uuid
 *           description: The ID of the patient associated with this report.
 *         dentistId:
 *           type: string
 *           format: uuid
 *           description: The ID of the dentist associated with this report.
 *         appointmentId:
 *           type: string
 *           format: uuid
 *           description: The ID of the appointment associated with this report.
 *         treatment:
 *           type: string
 *           description: The treatment provided in this report.
 *         prescribed_medication:
 *           type: string
 *           description: The prescribed medication mentioned in this report.
 *         recommendations:
 *           type: string
 *           description: Recommendations provided in this report.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date when this report was created.
 *       xml:
 *         name: Report
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the authentication was successful.
 *           example: true
 *         token:
 *           type: string
 *           description: JWT token for authenticated user.
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         type:
 *           type: string
 *           enum:
 *             - patient
 *             - dentist
 *           description: The type of user.
 *           example: patient
 *         role:
 *           type: string
 *           enum:
 *             - user
 *             - admin
 *           description: The role of the user.
 *           example: user
 *     Appointment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the appointment.
 *           example: "66310e70904b762e179310f2"
 *         appDate:
 *           type: string
 *           format: date-time
 *           description: The date of the appointment.
 *           example: "2024-04-30T12:00:00Z"
 *         user:
 *           type: string
 *           format: uuid
 *           description: The ID of the user associated with this appointment.
 *           example: "662fee9f09d98b9374e0c65a"
 *         userName:
 *           type: string
 *           description: The name of the user associated with this appointment.
 *           example: John Doe
 *         dentist:
 *           $ref: '#/components/schemas/Dentist'
 *         finished:
 *           type: boolean
 *           description: Appointment status
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when this appointment was created.
 *           example: "2024-04-30T12:00:00Z"
 *         __v:
 *           type: integer
 *           description: Data version in mongodb
 *           example: 0
 *         id:
 *           type: string
 *           description: The ID of the dentist.
 *           example: "6630f9fa25ad281219b9be71"
 *       required:
 *         - appDate
 *         - user
 *         - userName
 *         - dentist
 *         - createdAt
 *         - finished
 *       xml:
 *         name: Appointment
 */


const {getAppointments , getAppointment , addAppointment , updateAppointment , deleteAppointment} = require('../controllers/appointments');

const ReportRouter = require('./reports') ;

const router = express.Router({mergeParams:true}) ;

const {protect  , authorize} = require('../middleware/auth') ;

//Re-route into other resource routers
router.use('/:appointmentId/reports/' , ReportRouter) ;

router.route('/').get(protect,getAppointments).post(protect, authorize('admin' , 'user'),addAppointment);
router.route('/:id').get(protect , getAppointment).put(protect, authorize('admin' , 'user') ,updateAppointment).delete(protect, authorize('admin' , 'user') ,deleteAppointment) ;

module.exports=router;