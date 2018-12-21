const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var QandAtype2=new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'owners'
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

module.exports=QandA2=mongoose.model('qandas',QandAtype2);