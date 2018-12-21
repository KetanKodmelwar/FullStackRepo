const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

const search=require('../models/search');

const validateSearch=require('../validation/search');

const searchDetails={}


function handle_request(msg, callback){
   
    console.log("Inside searching a property");

    const {errors,validOrNot}=validateSearch(msg);

    if(!validOrNot){
        console.log("Error: Something is invalid in search property");
        //return res.status(400).json(errors);
        callback(null,[])
    }

    
    searchDetails.loc_search=msg.loc_search;
    searchDetails.arrive_date=msg.arrive_date;
    searchDetails.checkout_date=msg.checkout_date;
    searchDetails.guests=msg.guests;

    // res.json(searchDetails)
    callback(null,searchDetails)
    
};