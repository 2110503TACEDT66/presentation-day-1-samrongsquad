const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    brand :{
        type: String,
        required: [true, 'Please add a brand'],
        unique: true,
        trim: true,
        maxlength:[50, 'Name can not be more than 50 charracters']
    },
    type :{
        type: String,
        required: [true,'Please add a type']
    }
});

module.exports=mongoose.model('Car',CarSchema);