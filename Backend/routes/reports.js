const express = require('express') ;
const {getReports ,getReport ,createReport ,updateReport ,deleteReport , } = require('../controllers/reports');
const router = express.Router();

//Include other resource routers 

const { protect , authorize } = require('../middleware/auth');

//Re-route into other resource routers

router.route('/').get(protect , authorize('dentistId','patientId'),getReports).post(protect , authorize('dentist'), createDentist) ;
router.route('/:id').get(protect , authorize('dentistId','patientId'),getReport).put(protect , authorize('dentistId'), updateDentist).delete(protect , authorize('dentistId') ,deleteDentist);

module.exports=router ;