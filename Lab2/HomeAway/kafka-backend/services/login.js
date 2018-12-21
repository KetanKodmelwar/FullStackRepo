const express=require('express')
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const secretk=require('../config/mLabConnector');
const passport=require('passport');


const validateLogin=require('../validation/login');
const User=require('../models/User');



function handle_request(msg, callback){
    console.log("Inside Traveler's login");
    const {errors,validOrNot}=validateLogin(msg);

    if(!validOrNot){
        console.log("Error: Something is invalid");
        // return res.status(400).json(errors);
        return callback(null,errors);
    }
    const emailID = msg.emailID;
    const password=msg.password;
    console.log("Email and password",emailID);
    console.log("Email and password",password);

    User.findOne({emailID:emailID})
        .then(exiuser=>{
            console.log(exiuser);
            if(exiuser){
                bcrypt.compare(password,exiuser.password)
                    .then(matched=>{
                        if(matched){
                            // res.json({msg:"Successfully signed in"})
                            const userInfo={
                                id:exiuser.id,
                                emailID:exiuser.emailID ,
                                isOwner:exiuser.isOwner,
                                firstName:exiuser.firstName,
                                lastName:exiuser.lastName

                            };
                            console.log(userInfo);
                            jwt.sign(userInfo,secretk.secret,{expiresIn : 3600},(errorjwt,token)=>{
                                // res.json({
                                //     success:true,
                                //     token:'Bearer '+token
                                // });
                                resdata={
                                    success:true,
                                    token:'Bearer '+token
                                }
                                console.log("Toekn parrt",resdata);
                                callback(null,resdata)

                            });
                        }else{
                            errors.password="Password does not match the authenticated email ID";
                            // return res.status(400).json(errors);
                            
                            console.log("Errors part here");
                            callback(null,{password:"Password does not match the authenticated email ID"})
                        }
                    })
            }else{
                errors.emailID='Email not found'
                // return res.status(400).json(errors)
                console.log("Errors in email not found")
                callback(null,errors)
            }

        })
        .catch(error => {
            console.log(error)
        })
    
};

exports.handle_request = handle_request;


