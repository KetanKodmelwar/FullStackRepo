const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var Searchprop=new Schema({
    loc_search:{
        type: String,
        required: true
    },
    arrive_date:{
        type: Date,
        required: true
    },
    checkout_date:{
        type: Date,
        required: true
    },
    guests:{
        type:Number,
        required:true
    }

});


module.exports = Searchprop = mongoose.model('searches',Searchprop);