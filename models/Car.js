const mongoose = require('mongoose');

//name address district province postalcode tel type price licenseplate
const CarSchema = new mongoose.Schema({
    nameofmodel: {
        type: String,
        required: [true, 'Please add a name of model'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    brand: {
        type: String,
        required: [true, 'Please add a brand']
    },
    type: {
        type: String,
        enum: ['sedan', 'sport', 'truck', 'hatchback', 'convertible', 'suv', 'coupe', 'van', 'minivan', 'pickup', 'electric', 'hybrid', 'luxury', 'crossover'],
        required: [true, 'Please add a type']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be greater than or equal to 0']
    },
    licenseplate :{
        type: String,
        unique: true
        // unique:true,
        // match: [
        //     /^[1-9ก-ฮ][ก-ฮ][ -]?[0-9]{1,4}$/,
        //     'Please add a valid license plate number'
        // ]
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    district: {
        type: String,
        required: [true, 'Please add a district']
    },
    province: {
        type: String,
        required: [true, 'Please add a province']
    },
    postalcode: {
        type: String,
        required: [true, 'Please add a postalcode'],
        maxlength: [5,'Postal Code can not be more than 5 digits']
    },
    tel: {
        type: String,
        required: [true, 'Please add a telephone number'],
        match: [
            /^0[0-9]{9}$/,
            'Please add a valid telephone number'
        ]
    }

}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

//Reverse populate with virtuals
CarSchema.virtual('bookings', {
    ref: 'Booking',
    localField: '_id',
    foreignField: 'car',
    justOne: false
});

//Cascade delete appointments when  a hospital is deleted
CarSchema.pre('deleteOne', {document: true, query: false}, async function(next) {
    console.log(`Bookings being removed from car ${this.id}`);
    await this.model('Booking').deleteMany({car: this.id});
    next();
});

module.exports=mongoose.model('Car',CarSchema);