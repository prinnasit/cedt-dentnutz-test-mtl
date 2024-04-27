const Report = require('../models/Report');


exports.getReports = async (req,res,next)=>{
//dentistId or patientId
    let query;
    if(req.user.userType==="patient"){
        query = Report.find({ patientId: req.user.id }).populate({
            path: "dentistId",
            select: "name yearsOfExperience areaOfExpertise",
        }).populate({path:"patientId"});
    }
    else if(req.user.userType==="dentist"){
        if (req.body.appointmentId) {
            query = Report.find({ dentistId: req.user.id, appointmentId: req.body.appointmentId })
        } else {
            query = Report.find({ dentistId: req.user.id }).populate({
                path: "dentistId",
                select: "name yearsOfExperience areaOfExpertise",
            }).populate({path:"patientId"});
        }
    }
    else{
        return res.status(401).json({success:false , message: 'Not authorize to access this route'});
    }
    try{
        reports = await query;
        res.status(200).json({
            success: true,
            count: reports.length,
            data: reports,
        });
    }
    catch(error){
        res.status(400).json({success: false}) ;
    }
}
exports.getReport = async (req,res,next)=>{
//dentistId or patientId
    let query;
    if(req.user.userType==="patient"){
        query = Report.findById(req.params.id).populate({
            path: "dentistId",
            select: "name yearsOfExperience areaOfExpertise",
        }).populate({path:"patientId"});
    }
    else if(req.user.userType==="dentist"){
        query = Report.findById(req.params.id).populate({
            path: "dentistId",
            select: "name yearsOfExperience areaOfExpertise",
        }).populate({path:"patientId"});
    }
    else{
        return res.status(401).json({success:false , message: 'Not authorize to access this route'});
    }
    try{
        reports = await query;
        res.status(200).json({
            success: true,
            count: reports.length,
            data: reports,
        });
    }
    catch(error){
        res.status(400).json({success: false}) ;
    }
}
exports.createReport = async (req,res,next)=>{
//dentist
    if(req.user.userType === "dentist"){
        try{
            const report = await Report.create(req.body);
            res.status(201).json({
                success: true,
                data: report,
            });
        }
        catch(error){
            res.status(400).json({success: false , err:error.message}) ;
        }
    }
    else{
        res.status(401).json({success: false , message: "You are not authorized to create a report"});
    }
}
exports.updateReport = async (req,res,next)=>{
//dentistId
    if(req.user.userType === "dentist"){
        try {
            const report = await Report.findById(req.params.id);
        
            if (!report) {
                return res.status(400).json({ success: false });
            }
        
            if (report.dentistId.toString() !== req.user.id) {
                return res.status(401).json({ success: false, message: "You are not authorized to update this report" });
            }
        
            const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
            res.status(200).json({ success: true, data: updatedReport });
        } catch (err) {
            res.status(400).json({ success: false });
        }
        
    }
    else{
        res.status(401).json({success: false , message: "You are not authorized to update this report"});
    }
}

exports.deleteReport = async (req,res,next)=>{
//dentistId
    if(req.user.role === "admin"){
        try{
            const report  = await Report.findById(req.params.id);
    
            if(!report){
                return res.status(400).json({success: false}) ;
            }
        
            await report.deleteOne() ;
            res.status(200).json({success: true ,data:{}});
        }
        catch(err){
            res.status(400).json({success: false}) ;
        }
    }
    else{
        res.status(401).json({success: false , message: "You are not authorized to delete this report"});
    }
}
