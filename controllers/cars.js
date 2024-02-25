//@desc     Get all cars
//@route    Get /api/v1/cars
//@access   Public
exports.getCars = (req,res,next) => {
    res.status(200).json({success:true, msg:'Get all cars'});
};

//@desc     Get single car
//@route    Get /api/v1/cars/:id
//@access   Public
exports.getCar = (req,res,next) => {
    res.status(200).json({success:true, msg:`Get car ${req.params.id}`}); 
};

//@desc     Create a car
//@route    POST /api/v1/cars
//@access   Private
exports.createCar = (req,res,next) => {
    res.status(200).json({success:true, msg:'Create a car'});
};

//@desc     Update single car
//@route    PUT /api/v1/cars/:id
//@access   Private
exports.updateCar = (req,res,next) => {
    res.status(200).json({success:true, msg:`Update car ${req.params.id}`});
};

//@desc     Delete single car
//@route    DELETE /api/v1/cars/:id
//@access   Private
exports.deleteCar = (req,res,next) => {
    res.status(200).json({success:true, msg:`Delete car ${req.params.id}`});
};