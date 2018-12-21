const express=require('express')
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const secretk=require('../config/mLabConnector');
const passport=require('passport');

const validateSignup=require('../validation/signup');
const Owner=require('../models/Owners');


function handle_request(msg, callback){
   
    console.log("Inside Owner's signup");
    
    const {errors,validOrNot}=validateSignup(msg);

    if(!validOrNot){
        console.log("Error: Something is invalid");
        // return res.status(400).json(errors);
        callback(null,errors)
    }

     Owner.findOne({emailID:msg.emailID})
        .then(owner=>{
            if(owner){
                // res.code="400";
                // res.value="The email you entered already exists. Please enter another email"
                // console.log("Duplicate Email while signup ",res.value);
                // res.sendStatus(400).end();
                errors.emailID='Email already exists'
                // return res.status(400).json(errors);
                callback(null,errors)
            }else{
                const newOwner=new Owner({
                    firstName:msg.firstName,
                    lastName:msg.lastName,
                    emailID:msg.emailID,
                    password:msg.password,
                    isOwner:msg.isOwner
                });

                bcrypt.genSalt(15,(err,salt)=>{
                    bcrypt.hash(newOwner.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newOwner.password=hash;
                        newOwner.save()
                            // .then(res.json({
                            //     owner:newOwner
                            // }))
                            const data={success:true,newUser1:newOwner}
                            callback(null,data)
                            //.catch(err=>console.log(err));
                    })
                })
            }
        })
    
};

exports.handle_request = handle_request;
