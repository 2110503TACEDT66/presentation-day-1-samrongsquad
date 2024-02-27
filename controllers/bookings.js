const Booking = require('../models/Booking');
const Car = require('../models/Car');

//@desc Get all Bookings
//@route GET /api/v1/bookings
//@access Public
exports.getBookings = async (req, res, next) => {
    let query;
    //General users can see only their Bookings!
    if(req.user.role !== 'admin') {
        query = Booking.find({user: req.user.id}).populate({
            path: 'car',
            select: 'nameofmodel licenseplate province tel'
        });
    } else { //If you are an admin, you can see all!
        if(req.params.carId) {
            // console.log(req.params.CarId);
            query = Booking.find({car: req.params.carId}).populate({
                path: 'car',
                select: 'nameofmodel licenseplate province tel'
            });
        } else {
            query = Booking.find().populate({
                path: 'car',
                select: 'nameofmodel licenseplate province tel'
            });
        }
    }

    try {
        const bookings = await query;
        res.status(200).json({success: true, count: bookings.length, data: bookings});
    } catch(err) {
        console.log(err.stack); //500 server error
        return res.status(500).json({success: false, message: "Cannot find bookings"});
    }
};

//@desc Get single Booking
//@route GET /api/v1/bookings/:id
//@access Public
exports.getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id).populate({
            path: 'car',
            select: 'nameofmodel licenseplate province tel'
        });

        if(!booking) {
            return res.status(404).json({success: false, message: `No booking with the id of ${req.params.id}`});
        }

        res.status(200).json({success: true, data: booking});

    } catch(err) {
        console.log(err.stack);
        return res.status(500).json({success: false, message: 'Cannot find Booking'});
    }
};

//@desc Add Booking
//@route POST /api/v1/cars/:carId/bookings/
//@access Private
exports.addBooking = async (req, res, next) => {
    try {
        req.body.car = req.params.carId;

        const car = await Car.findById(req.params.carId);

        if(!car) {
            return res.status(404).json({success: false, message: `No Car with the id of ${req.params.CarId}`});
        }

        //Add user Id to req.body
        req.body.user = req.user.id;
        //Check for existed Booking
        const existedBookings = await Booking.find({user: req.user.id});
        //If the user is not an admin, they can only create 3 Bookings.
        if(existedBookings.length >= 3 && req.user.role !== 'admin') {
            return res.status(400).json({success: false, message: `The user with ID ${req.user.id} has already made 3 Bookings`});
        }

        const booking = await Booking.create(req.body);
        res.status(200).json({success: true, data: booking});

    } catch(err) {
        console.log(err.stack);
        return res.status(500).json({success: false, message: 'Cannot create Booking'});
    }
};

//@desc Update Booking
//@route PUT /api/v1/bookings/:id
//@access Private
exports.updateBooking = async (req, res, next) => {
    try {
        let booking = await Booking.findById(req.params.id);

        if(!booking) {
            return res.status(404).json({success: false, message: `No Booking with the id of ${req.params.id}`});
        }

        //Make sure user is the Booking owner
        if(booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({success: false, message: `User ${req.user.id} is not authorized to update this Booking`});
        }

        booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({success: true, data: booking});

    } catch(err) {
        console.log(err.stack);
        return res.status(500).json({success: false, message: 'Cannot update Booking'});
    }
};

//@desc Delete Booking
//@route DELETE /api/v1/bookings/:id
//@access Private
exports.deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if(!booking) {
            return res.status(404).json({success: false, message: `No Booking with the id of ${req.params.id}`});
        }

        //Make sure user is the Booking owner
        if(booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({success: false, message: `User ${req.user.id} is not authorized to delete this Booking`});
        }

        await booking.deleteOne();
        res.status(200).json({success: true, data: {}});

    } catch(err) {
        console.log(err.stack);
        return res.status(500).json({success: false, message: 'Cannot delete Booking'});
    }
};