const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

const listProperty=require('../models/ListProp');


function handle_request(msg, callback){
   
    console.log("Inside getting search details");
    console.log("Msg in here",msg.loc_search)
    listProperty.find({myprop_location:msg.loc_search})
        // .then(details=>res.json(details))
        // .catch(err=>res.json({err:"Could not find the property asked for"}))
        .then(details=>{
            if(details){
                console.log("Got some properties here",details);
                console.log("-------------------------------------------------");
                var detailsobj={
                    detailarray:details
                }
                callback(null,detailsobj)
            }
        })
        .catch(callback(null,[]))

};

exports.handle_request = handle_request;