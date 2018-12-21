const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var UserProfile=new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    
    firstName:{
        type: String
        
    },
    lastName:{
        type: String
       
    },
    aboutMe:{
        type: String
       
    },
    city:{
        type:String
        
    },
    company:{
        type:String
        
    },
    school:{
        type:String
        
    },
    hometown:{
        type:String

    },
    gender:{
        type:String
        
    },
    languages:{
        type:String
        
    },
    phone:{
        type:String
       
    }

});


module.exports = Profile = mongoose.model('profile',UserProfile);