// const {getReports } = require('../controllers/reports');
// const Report = require("../models/Report");
// const mongoose = require('mongoose');

// // Mocking the dependencies
// jest.mock('mongoose');

// describe('getReports function', () => {
//   // Test case for when user type is patient
//   it('should fetch reports for patient user', async () => {
//     const req = {
//       user: {
//         userType: 'patient',
//         id: 'patientUserId'
//       }
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     };
//     const mockReports = [
//       {
//         _id: 'reportId1',
//         patientId: 'patientId123',
//         dentistId: 'dentistId456',
//         appointmentId: 'appointmentId789',
//         treatment: 'Tooth extraction',
//         prescribed_medication: 'Painkillers',
//         recommendations: 'Rest and drink plenty of fluids',
//         date: new Date('2024-04-29'),
//       },
//       {
//         _id: 'reportId2',
//         patientId: 'patientId123',
//         dentistId: 'dentistId456',
//         appointmentId: 'appointmentId790',
//         treatment: 'Dental cleaning',
//         prescribed_medication: 'Fluoride toothpaste',
//         recommendations: 'Floss daily',
//         date: new Date('2024-04-28'),
//       },
//     ];

//     // Mocking the find and populate methods
//     Report.find = jest.fn().mockReturnValue({
//       populate: jest.fn().mockResolvedValue(mockReports)
//     });

//     await getReports(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       count: mockReports.length,
//       data: mockReports
//     });
//   });

//   // // Test case for when user type is dentist
//   // it('should fetch reports for dentist user', async () => {
//   //   const req = {
//   //     user: {
//   //       userType: 'dentist',
//   //       id: 'dentistUserId'
//   //     }
//   //   };
//   //   const res = {
//   //     status: jest.fn().mockReturnThis(),
//   //     json: jest.fn()
//   //   };
//   //   const expectedReports = [{/* Mocked report data */}];

//   //   // Mocking the find and populate methods
//   //   Report.find = jest.fn().mockReturnValue({
//   //     populate: jest.fn().mockResolvedValue(expectedReports)
//   //   });

//   //   await getReports(req, res);

//   //   expect(res.status).toHaveBeenCalledWith(200);
//   //   expect(res.json).toHaveBeenCalledWith({
//   //     success: true,
//   //     count: expectedReports.length,
//   //     data: expectedReports
//   //   });
//   // });

//   // // Test case for unauthorized user
//   // it('should return unauthorized for invalid user', async () => {
//   //   const req = {
//   //     user: {
//   //       userType: 'invalidUserType'
//   //     }
//   //   };
//   //   const res = {
//   //     status: jest.fn().mockReturnThis(),
//   //     json: jest.fn()
//   //   };

//   //   await getReports(req, res);

//   //   expect(res.status).toHaveBeenCalledWith(401);
//   //   expect(res.json).toHaveBeenCalledWith({
//   //     success: false,
//   //     message: 'Not authorize to access this route'
//   //   });
//   // });

//   // // Test case for error handling
//   // it('should handle errors', async () => {
//   //   const req = {
//   //     user: {
//   //       userType: 'patient',
//   //       id: 'patientUserId'
//   //     }
//   //   };
//   //   const res = {
//   //     status: jest.fn().mockReturnThis(),
//   //     json: jest.fn()
//   //   };

//   //   // Mocking the find method to throw an error
//   //   Report.find = jest.fn().mockImplementation(() => { throw new Error('Test error'); });

//   //   await getReports(req, res);

//   //   expect(res.status).toHaveBeenCalledWith(400);
//   //   expect(res.json).toHaveBeenCalledWith({ success: false });
//   // });
// });
