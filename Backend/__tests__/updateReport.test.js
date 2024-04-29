const {updateReport} = require('../controllers/reports');
const Report = require("../models/Report");

// Mocking the Report model methods
jest.mock("../models/Report");


describe('updateReport function', () => {
    it('should return 400 if report is not found', async () => {
      
      const bodyForUpdate = {
        treatment: "Updated Treatment",
        prescribed_medication: "Updated Medication",
        recommendations: "Updated Recommendations",
    };
    
    const req = {
        user: { userType: "dentist", id: "dentist_id" },
        params: { id: "report_id" },
        body: bodyForUpdate
    };
    
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Mocking the findById method of the Report model
        Report.findById.mockResolvedValue(null);

        await updateReport(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false });
    });

    // Test case for successful report update
    it('should return updated report if successful', async () => {
      const bodyForUpdate = {
        treatment: "Updated Treatment",
        prescribed_medication: "Updated Medication",
        recommendations: "Updated Recommendations",
    };
    
    const req = {
        user: { userType: "dentist", id: "dentist_id" },
        params: { id: "report_id" },
        body: bodyForUpdate
    };
    const updatedReport = {
      _id: "report_id", // Assuming the ID of the updated report
      patientId: "patient_id", // Assuming the ID of the patient associated with the report
      dentistId: "dentist_id", // Assuming the ID of the dentist associated with the report
      appointmentId: "appointment_id", // Assuming the ID of the appointment associated with the report
      treatment: "Treatment",
      prescribed_medication: "Medication",
      recommendations: "Recommendations",
      date: new Date(), // Assuming the date of the report is updated to the current date/time
    };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Mocking the findById method of the Report model to return a report
        Report.findById.mockResolvedValueOnce({
            dentistId: "dentist_id",
            // Other properties of the report
        });

        // Mocking the findByIdAndUpdate method of the Report model to return the updated report
        Report.findByIdAndUpdate.mockResolvedValueOnce(updatedReport);

        await updateReport(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: updatedReport });
    });

    // Test case for unauthorized access
    it('should return 401 if user is not authorized', async () => {
      const bodyForUpdate = {
        treatment: "Updated Treatment",
        prescribed_medication: "Updated Medication",
        recommendations: "Updated Recommendations",
    };
    
    const req = {
        user: { userType: "admin", id: "dentist_id" },
        params: { id: "report_id" },
        body: bodyForUpdate
    };
    
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Mocking the findById method of the Report model to return a report
        Report.findById.mockResolvedValueOnce({
            dentistId: "dentist_id",
            // Other properties of the report
        });

        await updateReport(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "You are not authorized to update this report" });
    });

    // More test cases for different scenarios can be added here
});
