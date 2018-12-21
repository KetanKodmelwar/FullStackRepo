const express=require('express')
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const secretk=require('../config/mLabConnector');
const passport=require('passport');

const validateSignup=require('../validation/signup');
const User=require('../models/User');


function handle_request(msg, callback){
    
    console.log("Inside Traveler's signup");

    const {errors,validOrNot}=validateSignup(msg);

    if(!validOrNot){
        console.log("Error: Something is invalid");
        //return res.status(400).json(errors);
        callback(null,errors)
    }

     User.findOne({emailID:msg.emailID})
        .then(user=>{
            if(user){
                // res.code="400";
                // res.value="The email you entered already exists. Please enter another email"
                // console.log("Duplicate Email while signup ",res.value);
                // res.sendStatus(400).end();
                errors.emailID='Email already exists'
                // return res.status(400).json(errors);
                return callback(null,errors)
            }else{
                const newUser=new User({
                    firstName:msg.firstName,
                    lastName:msg.lastName,
                    emailID:msg.emailID,
                    password:msg.password,
                    isOwner:msg.isOwner,
                    
                });

                bcrypt.genSalt(15,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password=hash;
                        newUser.save()
                            // .then(res.json({
                            //     user:newUser
                            // }))
                            const data={success:true,newUser1:newUser}
                            callback(null,data)
                            //.catch(err=>console.log(err));
                    })
                })
            }
        })
    
};

exports.handle_request = handle_request;


