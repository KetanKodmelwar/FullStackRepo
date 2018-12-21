const express=require('express')
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secretk=require('../../config/mLabConnector');
const passport=require('passport');
const User=require('../../models/User');
var kafka = require('../../kafka/client');

const validateSignup=require('../../validation/signup');
const validateLogin=require('../../validation/login');


router.post('/signup',(req,res)=>{

    console.log("Inside Traveler's signup");

    const {errors,validOrNot}=validateSignup(req.body);

    if(!validOrNot){
        console.log("Error: Something is invalid");
        return res.status(400).json(errors);
    }

     User.findOne({emailID:req.body.emailID})
        .then(user=>{
            if(user){
                // res.code="400";
                // res.value="The email you entered already exists. Please enter another email"
                // console.log("Duplicate Email while signup ",res.value);
                // res.sendStatus(400).end();
                errors.emailID='Email already exists'
                return res.status(400).json(errors);
            }else{
                const newUser=new User({
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    emailID:req.body.emailID,
                    password:req.body.password,
                    isOwner:req.body.isOwner
                });

                bcrypt.genSalt(15,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password=hash;
                        newUser.save()
                            .then(res.json({
                                user:newUser
                            }))
                            .catch(err=>console.log(err));
                    })
                })
            }
        })

    // kafka.make_request('signup',req.body, function(err,results){
    //     console.log('in result');
    //     console.log("ANy errors",err);
    //     console.log("Results in backedn",results);
    //     if (err){
    //         console.log("Inside err");
    //         // res.json({
    //         //     status:"error",
    //         //     msg:"System Error, Try Again."
    //         // })
    //        //res.end(JSON.stringify(err))
    //        console.log("Errors");
    //         //return res.status(400).json(err);
    //     }else{
    //     //   console.log("Inside else of results")

    //     //         // res.end(JSON.stringify(results));
    //     //         res.status(400).json(results)

    //     if(results.success)
    //         {
    //             res.end(JSON.stringify(results));
    //         }else{
    //             res.status(400).json(results)
    //         }
    //     }
        
    // });


})



router.post('/login',(req,res)=>{

    console.log("Inside Traveler's login");
    const {errors,validOrNot}=validateLogin(req.body);

    if(!validOrNot){
        console.log("Error: Something is invalid");
        return res.status(400).json(errors);
    }
    const emailID = req.body.emailID;
    const password=req.body.password;
    User.findOne({emailID:emailID})
        .then(exiuser=>{
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

                            jwt.sign(userInfo,secretk.secret,{expiresIn : 360000},(errorjwt,token)=>{
                                res.json({
                                    success:true,
                                    token:'Bearer '+token
                                });
                            });
                        }else{
                            errors.password="Password does not match the authenticated email ID";
                            return res.status(400).json(errors);
                        }
                    })
            }else{
                errors.emailID='Email not found'
                return res.status(400).json(errors)
            }

        })

    // kafka.make_request('login',req.body, function(err,results){
    //     console.log('in result');
    //     console.log("ANy errors",err);
    //     console.log("Results in backedn",results);
    //     if (err){
    //         // console.log("Inside err");
    //         // res.json({
    //         //     status:400,
    //         //     msg:err
    //         // })
    //         // res.json(err)
    //         console.log("Errors");
    //         //res.end(JSON.stringify(err))
    //         // return res.status(400).json(err);
    //     }else{
          
    //         if(results.success)
    //         {
    //             res.end(JSON.stringify(results));
    //         }else{
    //             res.status(400).json(results)
    //         }
                
                
    //         }
        
    // });

    
})







module.exports = router;
