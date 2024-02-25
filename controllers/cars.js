//@desc     Get all cars
//@route    Get /api/v1/cars
//@access   Public
exports.getCars = (req,res,next) => {
    res.status(200).json({success:true, msg:'Show all cars'});
};

//@desc     Get single car
//@route    Get /api/v1/cars/:id
//@access   Public
exports.getCar = (req,res,next) => {
    res.status(200).json({success:true, msg:`Show car ${req.params.id}`});
};

//@desc     Create new car
//@route    POST /api/v1/cars
//@access   Private
exports.createCar = (req,res,next) => {
    res.status(200).json({success:true, msg:'Create new cars'});
};

//@desc     Update car
//@route    PUT /api/v1/cars/:id
//@access   Private
exports.updateCar = (req,res,next) => {
    res.status(200).json({success:true, msg:`Update car ${req.params.id}`});
};

//@desc     Delete car
//@route    DELETE /api/v1/cars/:id
//@access   Private
exports.deleteCar = (req,res,next) => {
    res.status(200).json({success:true, msg:`Delete car ${req.params.id}`});
};