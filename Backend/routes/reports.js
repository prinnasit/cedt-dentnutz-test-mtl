const express = require('express') ;
const {getReports ,getReport ,createReport ,updateReport ,deleteReport , } = require('../controllers/reports');
const router = express.Router();


/**
 * @swagger
 * /reports:
 *   get:
 *     tags:
 *       - reports
 *     security:
 *       - bearerAuth: []
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
 *  
* paths:
*   /reports/{id}:
*     get:
*       tags:
*         - reports
*       security:
*         - bearerAuth: []
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
 */

/**
  * @swagger
  * /reports:
  *   post:
  *     tags:
  *       - reports
  *     security:
  *       - bearerAuth: []
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
  *   
  */
 /**
  * @swagger
  * get:
  *     tags:
  *       - reports
  *     security:
  *       - bearerAuth: []
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
* paths:
*   /reports/{id}:
*     put:
*       tags:
*         - reports
*       security:
*         - bearerAuth: []
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
 */


/**
 * @swagger
* paths:
*   /reports/{id}:
*     delete:
*       tags:
*         - reports
*       security:
*         - bearerAuth: []
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

//Include other resource routers 

const { protect , authorize } = require('../middleware/auth');

//Re-route into other resource routers

router.route('/').get(protect , authorize('user'),getReports).post(protect , authorize('user'), createReport) ;
router.route('/:id').get(protect , authorize('user'), getReport).put(protect , authorize('user'), updateReport).delete(protect , authorize('admin'), deleteReport);

module.exports=router ;

