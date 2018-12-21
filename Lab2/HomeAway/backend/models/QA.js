const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var QandAtype=new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },

    owner_id:{
        type:String
    },
    questionHeadline:{
        type:String,
        required:true
     },
    questionDescription:{
        type:String,
        required:true
    },
    answer:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=QandA=mongoose.model('QandA',QandAtype);