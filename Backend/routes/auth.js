const express = require('express');
const {register, login, getMe , logout} = require('../controllers/auth');


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs user into the system
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       '400':
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Please provide an email and password"
 *       '401':
 *         description: Invalid credentials or error converting email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Invalid credentials or cannot convert email or password to string"
 */
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged-in user
 *     description: Retrieves information about the current logged-in user.
 *     tags:
 *       - user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       '401':
 *         description: Not authorized to access this route
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
 *                   example: Not authorized to access this route
 */

 /**
  * @swagger
  * /reports:
  *   post:
  *     tags:
  *       - reports
  *     summary: Create a new report
  *     operationId: createReport
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Report'
  *     responses:
  *       '201':
  *         description: Report created successfully
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Report'
  *       '400':
  *         description: Invalid request or validation error
  *       '401':
  *         description: Unauthorized - user not authorized to create a report
  *   get:
  *     tags:
  *       - reports
  *     summary: Get reports
  *     operationId: getReports
  *     responses:
  *       '200':
  *         description: List of reports retrieved successfully
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
  *                   description: Number of reports retrieved
  *                   example: 3
  *                 data:
  *                   type: array
  *                   description: Array of reports
  *                   items:
  *                     $ref: '#/components/schemas/Report'
  *       '400':
  *         description: Invalid request or error retrieving reports
  *       '401':
  *         description: Unauthorized - user not authorized to access this route
  */

 /**
  * @swagger
  *   /appointments:
  *   get:
  *     tags:
  *       - appointment
  *     summary: Retrieve appointments based on user role and ID
  *     operationId: getAppointments
  *     parameters:
  *       - name: dentistID
  *         in: query
  *         description: ID of the dentist (optional)
  *         required: false
  *         schema:
  *           type: string
  *       - name: finished
  *         in: query
  *         description: Filter by appointment finished status (optional)
  *         required: false
  *         schema:
  *           type: boolean
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
  *                   example: 3
  *                 data:
  *                   type: array
  *                   description: Array of appointments
  *                   items:
  *                     $ref: '#/components/schemas/Appointment'
  *       '500':
  *         description: Internal server error - unable to retrieve appointments
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
  *                   description: Error message
  */

/**
 * @swagger
 *  paths:
*   /appointments/{id}:
*     put:
*       tags:
*         - appointment
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
*   components:
*     schemas:
*       Appointment: # Define your Appointment schema here
*         type: object
*         properties:
*           # Define properties of Appointment schema
 */

/**
 * @swagger
* paths:
*   /reports/{id}:
*     delete:
*       tags:
*         - reports
*       summary: Delete a report by ID
*       operationId: deleteReport
*       parameters:
*         - name: id
*           in: path
*           description: ID of the report to delete
*           required: true
*           schema:
*             type: string
*       responses:
*         '200':
*           description: Report deleted successfully
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     description: Indicates if the request was successful
*                     example: true
*                   data:
*                     type: object
*                     description: Empty object as data
*                     example: {}
*         '400':
*           description: Invalid request or error deleting report
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     description: Indicates if the request was successful
*                     example: false
*         '401':
*           description: Unauthorized - user not authorized to delete this report
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     description: Indicates if the request was successful
*                     example: false
*                   message:
*                     type: string
*                     description: Error message
 */

/**
 * @swagger
 * openapi: 3.0.0
* info:
*   title: Dentist Appointment API
*   version: 1.0.0
* paths:
*   /appointments/{id}:
*     get:
*       tags:
*         - appointment
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
 *  openapi: 3.0.0
* info:
*   title: Appointment API
*   version: 1.0.0
* paths:
*   /appointment/{dentistId}:
*     post:
*       tags:
*         - appointment
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
*                 user:
*                   type: string
*                   description: ID of the user booking the appointment.
*                 userName:
*                   type: string
*                   description: Name of the user booking the appointment.
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
 *  openapi: 3.0.0
* info:
*   title: Your API Title
*   version: 1.0.0
* paths:
*   /reports/{id}:
*     get:
*       tags:
*         - reports
*       summary: Get a report by ID
*       operationId: getReport
*       parameters:
*         - name: id
*           in: path
*           description: ID of the report to retrieve
*           required: true
*           schema:
*             type: string
*       responses:
*         '200':
*           description: Report retrieved successfully
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Report'
*         '400':
*           description: Invalid request or error retrieving report
*         '401':
*           description: Unauthorized - user not authorized to access this route
* components:
*   schemas:
*     Report:
*       # Your Report schema definition here
 */

/**
 * @swagger
 *  openapi: 3.0.0
* info:
*   title: Report Management API
*   version: 1.0.0
*   description: API for managing reports
* paths:
*   /reports/{id}:
*     put:
*       tags:
*         - reports
*       summary: Update a report by ID
*       operationId: updateReport
*       parameters:
*         - name: id
*           in: path
*           description: ID of the report to update
*           required: true
*           schema:
*             type: string
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 treatment:
*                   type: string
*                 prescribed_medication:
*                   type: string
*                 recommendations:
*                   type: string
*               required:
*                 - treatment
*                 - prescribed_medication
*                 - recommendations
*       responses:
*         '200':
*           description: Report updated successfully
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Report'
*         '400':
*           description: Invalid request or error updating report
*         '401':
*           description: Unauthorized - user not authorized to update this report
*         '404':
*           description: Report not found
* components:
*   schemas:
*     Report:
*       type: object
*       properties:
*         id:
*           type: string
*         treatment:
*           type: string
*         prescribed_medication:
*           type: string
*         recommendations:
*           type: string
 */

/**
 * @swagger
 * openapi: 3.0.0
* info:
*   title: User Registration API
*   version: 1.0.0
* paths:
*   /register:
*     post:
*       summary: Register a new user
*       tags:
*         - user
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 name:
*                   type: string
*                   description: The name of the user
*                 email:
*                   type: string
*                   format: email
*                   description: The email address of the user
*                 password:
*                   type: string
*                   description: The password of the user
*                 role:
*                   type: string
*                   enum: [user, admin]
*                   default: user
*                   description: The role of the user (user or admin)
*                 userType:
*                   type: string
*                   enum: [patient, dentist]
*                   default: patient
*                   description: The type of user (patient or dentist)
*                 tel:
*                   type: string
*                   description: The telephone number of the user
*       responses:
*         '200':
*           description: User registration successful
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     example: true
*                   token:
*                     type: string
*                     example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
*                   type:
*                     type: string
*                     example: "patient"
*                   role:
*                     type: string
*                     example: "user"
*         '400':
*           description: Invalid request data or email already exists
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     example: false
*                   error:
*                     type: string
*                     example: "Email already exists"
 */
/**
 * 
 */
const router = express.Router() ;

const {protect}  =require('../middleware/auth');

router.post('/register',register);
router.post('/login' , login)
router.get('/me' , protect , getMe) ;
router.get('/logout' , logout) ;

module.exports=router;