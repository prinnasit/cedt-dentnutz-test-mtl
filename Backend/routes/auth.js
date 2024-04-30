const express = require('express');
const {register, login, getMe , logout} = require('../controllers/auth');


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
 * openapi: 3.0.0
* paths:
*   /auth/register:
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
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Log user out / clear cookie
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
 *                   type: object
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
 *                   example: Unauthorized
 */


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         role:
 *           type: string
 *           enum:
 *             - user
 *             - admin
 *           default: user
 *           description: The role of the user.
 *         userType:
 *           type: string
 *           enum:
 *             - patient
 *             - dentist
 *           default: patient
 *           description: The type of user.
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user.
 *           minLength: 6
 *         tel:
 *           type: string
 *           pattern: '^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$'
 *           description: The telephone number of the user.
 *         resetPasswordToken:
 *           type: string
 *           description: Token used for resetting password.
 *         resetPasswordExpire:
 *           type: string
 *           format: date-time
 *           description: Expiry date for the reset password token.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the user was created.
 *       required:
 *         - name
 *         - email
 *         - password
 *         - tel
 *         - createdAt
 *       example:
 *         name: John Doe
 *         email: john@example.com
 *         role: user
 *         userType: patient
 *         password: password123
 *         tel: 092-456-7890
 *   requestBodies:
 *     UserArray:
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/scdhemas/User'
 *       description: List of user objects
 *       required: true
 * 
 * security:
 *  - bearerAuth: []  
 */



const router = express.Router() ;

const {protect}  =require('../middleware/auth');

router.post('/register',register);
router.post('/login' , login)
router.get('/me' , protect , getMe) ;
router.get('/logout' , logout) ;

module.exports=router;