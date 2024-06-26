const Dentist = require('../models/Dentist');



//@desc  Get all dentists
//@route GeT /api/v1/dentists
//@access Public
exports.getDentists  = async (req , res , next)=>{
    let query ; 
    //copy req.query
    const reqQuery = {...req.query};
    //Fields to exclude
    const removeFields= ['select' , 'sort' , 'page' , 'limit'] ;

    //Loop over remove  frelds and delete them from req Query
    removeFields.forEach(param=> delete reqQuery[param]);
    console.log(reqQuery) ;


    //Create query String
    let queryStr = JSON.stringify(reqQuery) ;
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g , match=> `$${match}`);

    // if(req.user.role == "admin"){
    //     query = Dentist.find(JSON.parse(queryStr)).populate('appointments');
    // }
    // else{
    //     query = Dentist.find(JSON.parse(queryStr)) ;
    // }
    query = Dentist.find(JSON.parse(queryStr)).populate('appointments');

    //Select Fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields) ;
    }
    //Sort
    if(req.query.sort){
        const sortBy = req.query.select.split(',').join(' ');
        query = query.sort(sortBy);
    }
    else{
        query = query.sort('name') ;
    }

    //Pagination
    const page = parseInt(req.query.page,10) || 1 ;
    const limit = parseInt(req.query.limit , 10)|| 25 ;
    const startIndex = (page -1 )*limit ; 
    const endIndex = (page)*limit ;
   

    try{
        const total = await Dentist.countDocuments() ;

        query = query.skip(startIndex).limit(limit) ;

        //Excuting query
        const dentists  = await query;
        // console.log(req.query) ;
        
        //Pagination result
        const pagination = {} ;

        if(endIndex < total){
            pagination.next= {page:page+1 ,limit};
        }
        if(startIndex > 0){
            pagination.prev= {page:page-1 ,limit};
        }

    
    res.status(200).json({success:true,count: dentists.length , pagination, data:dentists});
    }
    catch(err){
        res.status(400).json({success: false}) ;
    }

};

//@desc  Get single dentist
//@route GeT /api/v1/dentist/:id
//@access Public

exports.getDentist =async( req , res , next)=>{
    try{
        const dentist  = await Dentist.findById(req.params.id);
    
    if(!dentist){
        return res.status(400).json({success: false}) ;
    }

    res.status(200).json({success: true ,data:dentist});}
    catch(err){
        res.status(400).json({success: false}) ;
    }
};

//@desc  Creaet a  Dentist
//@route Post /api/v1/dentists
//@access Private

exports.createDentist = async (req , res , next)=>{
    const dentist = await Dentist.create(req.body);
    res.status(201).json({success:true, data:dentist});
};


//@desc  update single dentist
//@route put /api/v1/dentist/:id
//@access Private

exports.updateDentist =async (req , res , next)=>{
    try{
        const dentist  = await Dentist.findByIdAndUpdate(req.params.id , req.body ,{
            new: true ,
            runValidators: true

        });
    
    if(!dentist){
        return res.status(400).json({success: false}) ;
    }

    res.status(200).json({success: true ,data:dentist});}
    catch(err){
        res.status(400).json({success: false}) ;
    }
};


//@desc  delete single dentist
//@route delete /api/v1/dentist/:id
//@access Private

exports.deleteDentist =async (req , res , next)=>{
    try{
        const dentist  = await Dentist.findById(req.params.id);
    
    if(!dentist){
        return res.status(400).json({success: false}) ;
    }

    await dentist.deleteOne() ;
    res.status(200).json({success: true ,data:{}});
}
    catch(err){
        res.status(400).json({success: false}) ;
    }
};
