const mongoose=require('mongoose');

const contactSchema= mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:false
    },
    contactName:{
        type:String,
        required: true
    },
    contactEmail:{
        type:String,
        required: true
    },
    contactPhone:{
        type:String,
        required: true
    },
    contactType:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('contact',contactSchema) ;