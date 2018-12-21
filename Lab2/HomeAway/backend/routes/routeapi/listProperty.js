const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');
var kafka = require('../../kafka/client');

const user=require('../../models/User');
const listProperty=require('../../models/ListProp');


const validatelistProperty=require('../../validation/listProperty');

router.post('/listing',passport.authenticate('jwt',{session:false}),(req,res)=>{

    // console.log("Inside Listing property");
    // const {errors,validOrNot}=validatelistProperty(req.body);

    // if(!validOrNot){
    //     console.log("Error: Something is invalid");
    //     return res.status(400).json(errors);
    // }

    // const newProperty=new listProperty({
    //     user:req.user.id,
    //     myprop_location:req.body.myprop_location,
    //     myprop_headline:req.body.myprop_headline,
    //     myprop_description:req.body.myprop_description,
    //     myprop_bedrooms:req.body.myprop_bedrooms,
    //     myprop_accomodates:req.body.myprop_accomodates,
    //     myprop_bathrooms:req.body.myprop_bathrooms,
    //     myprop_pricing:req.body.myprop_pricing,
    //     cleanFee:req.body.cleanFee,
    //     available_startDate:req.body.available_startDate,
    //     available_endDate:req.body.available_endDate

    // });

    // newProperty.save()
    //     .then(res.json({listProperty:newProperty}))
    //     .catch(err=>{res.json({err:"Error in listing property"})});

    kafka.make_request('listing',req.body, function(err,results){
        console.log('in result');
        console.log("Results in backedn",results);
        if (err){
            console.log("Inside err");
            // res.json({
            //     status:"error",
            //     msg:"System Error, Try Again."
            // })
            res.json(err)
            // return res.status(400).json(err);
        }else{
          

                res.end(JSON.stringify(results));
            }
        
    });

    
})

module.exports=router;