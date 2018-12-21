const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

const user=require('../models/User');
const listProperty=require('../models/ListProp');


const validatelistProperty=require('../validation/listProperty');


function handle_request(msg, callback){
   
    console.log("Inside Listing property");
    const {errors,validOrNot}=validatelistProperty(msg);

    if(!validOrNot){
        console.log("Error: Something is invalid");
        return res.status(400).json(errors);
    }

    const newProperty=new listProperty({
        user:msg.owner_id,
        myprop_location:msg.myprop_location,
        myprop_headline:msg.myprop_headline,
        myprop_description:msg.myprop_description,
        myprop_type:msg.myprop_type,
        myprop_bedrooms:msg.myprop_bedrooms,
        myprop_accomodates:msg.myprop_accomodates,
        myprop_bathrooms:msg.myprop_bathrooms,
        myprop_pricing:msg.myprop_pricing,
        cleanFee:msg.cleanFee,
        available_startDate:msg.available_startDate,
        available_endDate:msg.available_endDate,
        imagename:msg.imagename

    });

    newProperty.save()
        // .then(res.json({listProperty:newProperty}))
        // .catch(err=>{res.json({err:"Error in listing property"})});

        .then(callback(null,newProperty))
        .catch(callback(null,[]))

    
};

exports.handle_request = handle_request;