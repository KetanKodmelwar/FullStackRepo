const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');


const listProperty=require('../../models/ListProp')
const User=require('../../models/User');
const Owner=require('../../models/Owners');


router.post('/bookProperty',passport.authenticate('jwt',{session:false}),(req,res)=>{

    console.log("Inside booking property");

    // myprop_id:this.props.search.searchResult[val]._id,
    // owner_id:this.props.search.searchResult[val].user,
    // bookCheckin_date:this.props.location.state.arrive_date,
    // bookCheckout_date:this.props.location.state.checkout_date,
    // user_id:this.props.log.user._id


    const bookData={}

    
    bookData.bookCheckin_date=req.body.bookCheckin_date;
    bookData.bookCheckout_date=req.body.bookCheckout_date;
    bookData.user_id=req.body.user_id;
    bookData.isBooked="yes";

        console.log("data trial for backend",bookData);

    listProperty.findOneAndUpdate({_id:req.body.myprop_id},{$set:bookData},{new:true})
        .then(property=>res.json(property))
        .catch(err=>{console.log("Property not found for updation")})            
})

router.post('/showProperty',passport.authenticate('jwt',{session:false}),(req,res)=>{

    console.log("Inside owned or showing the property booked");
    if(req.body.isOwner==="yes")
    {
    listProperty.find({user:req.body.user_id})
        .then(property=>{
            if(property){
                res.json(property)
            }
        })
        //.catch(err=>{console.log("No properties found")})
    }else{
        listProperty.find({user_id:req.body.user_id})
        .then(property=>{
            if(property){
                res.json(property)
            }
        })
        .catch(err=>{console.log("No properties found")})
    }

})

module.exports=router;