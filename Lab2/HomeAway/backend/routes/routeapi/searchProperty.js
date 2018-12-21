const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');
var kafka = require('../../kafka/client');

const user=require('../../models/User');
const listProperty=require('../../models/ListProp');
const search=require('../../models/search');

const validateSearch=require('../../validation/search');

const searchDetails={}

router.post('/search',passport.authenticate('jwt',{session:false}),(req,res)=>{

    console.log("Inside searching a property");

    const {errors,validOrNot}=validateSearch(req.body);

    if(!validOrNot){
        console.log("Error: Something is invalid in search property");
        return res.status(400).json(errors);
    }

    
    searchDetails.loc_search=req.body.loc_search;
    searchDetails.arrive_date=req.body.arrive_date;
    searchDetails.checkout_date=req.body.checkout_date;
    searchDetails.guests=req.body.guests;

    res.json(searchDetails)
    
})


router.post('/getProperty',passport.authenticate('jwt',{session:false}),(req,res)=>{

    console.log("Inside getting search details");

    listProperty.find({myprop_location:searchDetails.loc_search,isBooked:"no"})
        .then(details=>res.json(details))
        .catch(err=>res.json({err:"Could not find the property asked for"}))

    // kafka.make_request('getproperty',req.body, function(err,results){
    //     console.log('in result');
    //     console.log("Results in backedn",results);
    //     if (err){
    //         console.log("Inside err");
    //         // res.json({
    //         //     status:"error",
    //         //     msg:"System Error, Try Again."
    //         // })
    //         res.json(err)
    //         // return res.status(400).json(err);
    //     }else{
          
    //             console.log("Backend results",results);
    //             res.end(JSON.stringify(results.detailarray));
    //         }
        
    // });

})
module.exports=router;