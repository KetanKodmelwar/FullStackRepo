const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

const validateProfile=require('../validation/profile');
const Profile=require('../models/Profile');



function handle_request(msg, callback){
   
    console.log("Inside Profile method");
    //we are using req.user because after authentication the user info is in req
    console.log("Trying to get the user id here",msg);
    Profile.findOne({user:msg.user_id})
        .then(exiprofile=>{
            if(!exiprofile){
                //res.status(404).json({Profile:"Profile not found"})
                const newProfile=new Profile({
                    user:msg.user_id,
                    firstName:msg.firstName,
                    lastName:msg.lastName
                })

                newProfile.save()
                    // .then(res.status(200).json({Profile:"Profile created successfully"}));
                    // .then(res.json({profile:newProfile}))
                    // .catch(err=>{console.log(err)})
                    .then(callback(null,newProfile))
                    .catch(callback(null,[]))
            }

            //  res.json(exiprofile)
            callback(null,exiprofile)
        })
        //.catch(err=>res.status(404).json({err:"Error here"} ));
        .catch(null,[])
};

exports.handle_request = handle_request;

