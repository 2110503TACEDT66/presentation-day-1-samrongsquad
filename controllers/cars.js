const Car = require('../models/Car');

//@desc     Get all cars
//@route    Get /api/v1/cars
//@access   Public
exports.getCars = async (req,res,next) => {
    try{
        const cars = await Car.find();

        res.status(200).json({success:true, count:cars.length, data:cars});
    } catch(err){
        res.status(400).json({success:false});
    }
};

//@desc     Get single car
//@route    Get /api/v1/cars/:id
//@access   Public
exports.getCar = async (req,res,next) => {
    try{
        const car = await Car.findById(req.params.id);

        if(!car){
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true, data:car});
    } catch(err){
        res.status(400).json({success:false});
    }
};

//@desc     Create a car
//@route    POST /api/v1/cars
//@access   Private
exports.createCar = async (req,res,next) => {
    const car = await Car.create(req.body);
    res.status(201).json({success:true, data:car});
};

//@desc     Update single car
//@route    PUT /api/v1/cars/:id
//@access   Private
exports.updateCar = async (req,res,next) => {
    try{
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true});

        if(!car){
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true, data:car});
    } catch(err){
        res.status(400).json({success:false});
    }
};

//@desc     Delete single car
//@route    DELETE /api/v1/cars/:id
//@access   Private
exports.deleteCar = async (req,res,next) => {
    try{
        const car = await Car.findByIdAndDelete(req.params.id);

        if(!car){
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true, data: {}});
    } catch(err){
        res.status(400).json({success:false});
    }
};