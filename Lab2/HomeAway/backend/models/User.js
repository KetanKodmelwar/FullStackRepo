const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var User=new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    emailID:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    isOwner:{
        type:String
    }

});


module.exports = User = mongoose.model('users',User);