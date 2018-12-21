const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var PropertyListing=new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'owners'
    },
    myprop_location:{
        type: String
        
    },
    myprop_headline:{
        type: String
       
    },
    myprop_description:{
        type: String
       
    },
    myprop_type:{
        type:String
        
    },
    myprop_bedrooms:{
        type:Number
        
    },
    myprop_accomodates:{
        type:Number
        
    },
    myprop_bathrooms:{
        type:Number

    },
    myprop_pricing:{
        type:Number,
        required:true
        
    },
    cleanFee:{
        type:Number,
        required:true
    },
    available_startDate:{
        type:Date,
        required:true
       
    },
    available_endDate:{
        type:Date,
        required:true
       
    },
    bookCheckin_date:{
        type:Date
    },
    bookCheckout_date:{
        type:Date
    },
    user_id:{
        type:String
    },
    isBooked:{
        type:String,
        default:"no"
    },
    imagename:{
        type:String
    }

});


module.exports = PropertyListing = mongoose.model('properties',PropertyListing);