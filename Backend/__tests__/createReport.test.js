const {createReport} = require('../controllers/functionForTest');
const Report = require("../models/Report");
  
jest.mock("../models/Report");
jest.mock("../config/db");
  
  describe("createReport", () => {
    let req, res, next;
  
    beforeEach(() => {
      req = {
        params: {},
        body: {},
        user: {
          id: "6619704566e9ff32122e4542",
          role: "user",
          userType: "dentist"
        }
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
      };
      next = jest.fn();
    });
  
    it("create report successful status 201", async () => {
      req.body.patientId = "661972a6e672efe0775e5c0c";
      req.body.appointmentId = "662e65870c6675cfa21f2101";
      req.body.dentistId = "6619704566e9ff32122e4542";
      req.body.treatment = "Root Canal";
      req.body.prescribed_medication = "Ibuprofen";
      req.body.recommendations = "Rest for 2 days";
      req.body.date = new Date("2024-04-27T06:00:00.000+00:00");
  
      const dupeReport = [];
      Report.find.mockResolvedValue(dupeReport);

      Report.create.mockResolvedValue({
        patientId: req.body.patientId,
        dentistId: req.body.dentistId,
        appointmentId: req.body.appointmentId,
        treatment: req.body.treatment,
        prescribed_medication: req.body.prescribed_medication,
        recommendations: req.body.recommendations,
        date: req.body.date,
      });
  
      await createReport(req, res, next);
  
      expect(Report.find).toHaveBeenCalledWith({
        appointmentId: req.body.appointmentId
      });
      expect(Report.create).toHaveBeenCalledWith({
        patientId: req.body.patientId,
        dentistId: req.body.dentistId,
        appointmentId: req.body.appointmentId,
        treatment: req.body.treatment,
        prescribed_medication: req.body.prescribed_medication,
        recommendations: req.body.recommendations,
        date: req.body.date,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: {
          patientId: req.body.patientId,
          dentistId: req.body.dentistId,
          appointmentId: req.body.appointmentId,
          treatment: req.body.treatment,
          prescribed_medication: req.body.prescribed_medication,
          recommendations: req.body.recommendations,
          date: req.body.date,
        }
      });
    });
  
    it("duplicate report status 400", async () => {
      const dupeReport = [{
          patientId: req.body.patientId,
          dentistId: req.body.dentistId,
          appointmentId: req.body.appointmentId,
          treatment: req.body.treatment,
          prescribed_medication: req.body.prescribed_medication,
          recommendations: req.body.recommendations,
          date: req.body.date,
      }];
      Report.find.mockResolvedValue(dupeReport);
  
      await createReport(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'This appointment already have a report'
      });
    });
  
    it("not authorize status 401", async () => {
      req.user.userType = "patient";
  
      await createReport(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'You are not authorized to create a report'
      });
    });

    it("error status 400", async () => {

      const dupeReport = [];
      Report.find.mockResolvedValue(dupeReport);

      Report.create.mockRejectedValue(new Error("Database error"));
  
      await createReport(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
      });
    });
  });
  