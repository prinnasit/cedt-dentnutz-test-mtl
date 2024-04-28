// const {getReports } = require('../controllers/reports');
// const Report = require("../models/Report");

// jest.mock("../models/Report");

// describe("getReports", () => {
  
//   let req, res, next;

//   beforeEach(() => {
//     req = {
//       params: {},
//       body: {},
//       user: {},
//     };
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//       send: jest.fn()
//     };
//     next = jest.fn();
//   });

//   // beforeEach(() => {
//   //   req = {
//   //     params: {
//   //       id: "662d0a6d7a660d790450a5e0"
//   //     },
//   //     user: {
//   //       id: "662d07e98893ed043ba9ff36",
//   //       role: "user"
//   //     },
//   //     body: {}
//   //   };
//   //   res = {
//   //     status: jest.fn().mockReturnThis(),
//   //     json: jest.fn(),  
//   //     send: jest.fn()
//   //   };
//   //   next = jest.fn();
//   // });


//   // it("should return 400 if an error ", async () => {
//   //   req.user = { userType: "patient" };

//   //   Report.find.mockRejectedValue(new Error("Database error"));

//   //   await getReports(req, res, next);

//   //   expect(res.status).toHaveBeenCalledWith(400);
//   //   expect(res.json).toHaveBeenCalledWith({ success: false });
//   // });

//   // it("should return reports for patient", async () => {
//   //   req.user = { id: "661972a6e672efe0775e5c0c",role:"user", userType: "patient" };
//   //   const mockReports = [
//   //     {
//   //       _id : "662de0f93b411db4ed44ea0a",
//   //       patientId: "6602f3f625b6db9b9bd475d4",
//   //       dentistId: "6619704566e9ff32122e4542",
//   //       appointmentId: "662cf0489341005c9cfe07df",
//   //       treatment: " ",
//   //       prescribed_medication: " ",
//   //       recommendations: " ",
//   //       date: new Date("2024-04-29T06:00:00.000Z")
//   //     },
//   //     {
//   //       patientId: "612345678901234567890124",
//   //       dentistId:   "712345678901234567890124",
//   //       appointmentId: "812345678901234567890124",
//   //       treatment: "Cavity Filling",
//   //       prescribed_medication: "Painkillers",
//   //       recommendations: "Avoid sugary foods",
//   //       date: new Date("2024-04-30T11:00:00Z")
//   //     }
//   //   ];
    
//   //   //Report.find.mockResolvedValue(mockReports);
//   //   Report.find.mockReturnValue({
//   //         populate: jest.fn().mockResolvedValue(mockReports)
//   //       });
  

//   //   await getReports(req, res, next);

//   //   expect(Report.find).toHaveBeenCalledWith({ patientId: req.user.id });
//   //   expect(Report.find().populate).toHaveBeenCalledWith('dentistId patientId appointmentId');
//   //   expect(res.status).toHaveBeenCalledWith(200); 
//   //   expect(res.json).toHaveBeenCalledWith({
//   //     success: true,
//   //     count: mockReports.length,
//   //     data: mockReports,
//   //   });
//   // });

// // Test for patient user
// // Test for patient user
// // it("should return reports for patient", async () => {
// //   req.user = { id: "661972a6e672efe0775e5c0c", role: "user", userType: "patient" };
// //   const mockReports = [
// //     {
// //       _id : "662de0f93b411db4ed44ea0a",
// //       patientId: "6602f3f625b6db9b9bd475d4",
// //       dentistId: "6619704566e9ff32122e4542",
// //       appointmentId: "662cf0489341005c9cfe07df",
// //       treatment: " ",
// //       prescribed_medication: " ",
// //       recommendations: " ",
// //       date: new Date("2024-04-29T06:00:00.000Z")
// //     },
// //     {
// //       patientId: "612345678901234567890124",
// //       dentistId: "712345678901234567890124",
// //       appointmentId: "812345678901234567890124",
// //       treatment: "Cavity Filling",
// //       prescribed_medication: "Painkillers",
// //       recommendations: "Avoid sugary foods",
// //       date: new Date("2024-04-30T11:00:00Z")
// //     }
// //   ];

// //   // Mock implementation of Report.find() to return reports sorted by date
// //   const sortMock = jest.fn().mockReturnThis(); // Return the context of the next chained method (sort)
// //   const populateMock = jest.fn().mockResolvedValue(mockReports); // Mock the populate method to resolve with mockReports
// //   Report.find.mockReturnValue({
// //     populate: populateMock,
// //     sort: sortMock // mock chaining of sort() method
// //   });

// //   await getReports(req, res, next);

// //   expect(Report.find).toHaveBeenCalledWith({ patientId: req.user.id });
// //   expect(populateMock).toHaveBeenCalledWith('dentistId patientId appointmentId');
// //   expect(sortMock).toHaveBeenCalledWith('date'); // Ensure sorting by date is called
// //   expect(res.status).toHaveBeenCalledWith(200); 
// //   expect(res.json).toHaveBeenCalledWith({
// //     success: true,
// //     count: mockReports.length,
// //     data: mockReports,
// //   });
// // });

  
//   // it("should return reports for patient", async () => {
//   //   req.user = { id: "123456", userType: "patient" };
//   //   const mockReports = [
//   //     {
//   //       patientId: "612345678901234567890123",
//   //       dentistId: "712345678901234567890123",
//   //       appointmentId: "812345678901234567890123",
//   //       treatment: "Teeth Cleaning",
//   //       prescribed_medication: "None",
//   //       recommendations: "Brush teeth twice a day",
//   //       date: new Date("2024-04-29T10:00:00Z")
//   //     },
//   //     {
//   //       patientId: "612345678901234567890124",
//   //       dentistId: "712345678901234567890124",
//   //       appointmentId: "812345678901234567890124",
//   //       treatment: "Cavity Filling",
//   //       prescribed_medication: "Painkillers",
//   //       recommendations: "Avoid sugary foods",
//   //       date: new Date("2024-04-30T11:00:00Z")
//   //     }
//   //   ];
    
//   //   // Mock Report.find to resolve with mockReports
//   //   Report.find.mockReturnValue({
//   //     populate: jest.fn().mockResolvedValue(mockReports)
//   //   });
  
//   //   await getReports(req, res, next);
  
//   //   expect(Report.find).toHaveBeenCalledWith({ patientId: req.user.id });
//   //   expect(Report.find().populate).toHaveBeenCalledWith('dentistId patientId appointmentId');
//   //   expect(res.status).toHaveBeenCalledWith(200); 
//   //   expect(res.json).toHaveBeenCalledWith({
//   //     success: true,
//   //     count: mockReports.length,
//   //     data: mockReports,
//   //   });
//   // });
  
  
//   // it("should return reports for dentist", async () => {
//   //   req.user = { id: "dentistId", userType: "dentist" };
//   //   const mockReports = [{ id: 1, dentistId: "dentistId" }];

//   //   Report.find.mockResolvedValue(mockReports);

//   //   await getReports(req, res, next);

//   //   expect(Report.find).toHaveBeenCalledWith({ dentistId: "dentistId" });
//   //   expect(res.status).toHaveBeenCalledWith(200);
//   //   expect(res.json).toHaveBeenCalledWith({
//   //     success: true,
//   //     count: mockReports.length,
//   //     data: mockReports,
//   //   });
//   // });

//   // it("should return 401 if user type is neither patient nor dentist", async () => {
//   //   req.user = { userType: "invalidUserType" };

//   //   await getReports(req, res, next);

//   //   expect(res.status).toHaveBeenCalledWith(401);
//   //   expect(res.json).toHaveBeenCalledWith({
//   //     success: false,
//   //     message: "Not authorize to access this route",
//   //   });
//   // });

//   // Importing the necessary modules and the function to test

// // Mocking the req, res, and next objects
// const mockReq = (userType, userId) => ({
//   user: { userType, id: userId }
// });
// const mockRes = () => {
//   const res = {};
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);
//   return res;
// };

// // Test suite for the getReports function
// describe('getReports function', () => {
//   it('should return reports for patient', async () => {
//     // Mocking the request object
//     const req = mockReq('patient', 'patientId123');
//     const res = mockRes();

//     // Mock report data
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

//     // Mock implementation of Report.find() to return reports sorted by date
//     const sortMock = jest.fn().mockResolvedValue(mockReports); // Return the context of the next chained method (sort)
//     const populateMock = jest.fn().mockReturnValue({ sort: sortMock }); // Mock the populate method to return an object with sort method
//     Report.find.mockReturnValue({
//       populate: populateMock, // mock chaining of populate() method
//     });

//     // Calling the function under test
//     await getReports(req, res);

//     // Assertions
//     expect(Report.find).toHaveBeenCalledWith({ patientId: req.user.id });
//     expect(populateMock).toHaveBeenCalledWith('dentistId patientId appointmentId');
//     expect(sortMock).toHaveBeenCalledWith('date'); // Ensure sorting by date is called
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       count: mockReports.length,
//       data: mockReports,
//     });
//   });
// });

// });