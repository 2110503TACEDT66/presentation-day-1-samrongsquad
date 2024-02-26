const mongoose = require('mongoose');

//name address district province postalcode tel type price licenseplate
const CarSchema = new mongoose.Schema({
    nameofmodel: {
        type: String,
        required: [true, 'Please add a nameofmodel'],
        unique: true,
        trim: true,
        maxlength:[50, 'Name can not be more than 50 charracters']
    },
    brand :{
        type: String
       
    },
    type :{
        type: String,
        enum: ['sedan','sport','truck'],
        required: [true,'Please add a type']
    },
    price :{
        type: String
    },
    licenseplate :{
        type:String,
        unique:true
    },
    address:{
        type: String,
        required: [true, 'Please add an address']
    },
    district:{
        type: String,
        required: [true, 'Please add a district']
    },
    province:{
        type: String,
        required: [true, 'Please add a province']
    },
    postalcode:{
        type: String,
        required: [true, 'Please add a postalcode'],
        maxlength: [5,'Postal Code can not be more than 5 digits']
    },
    tel:{
        type: String
    }

});

module.exports=mongoose.model('Car',CarSchema);