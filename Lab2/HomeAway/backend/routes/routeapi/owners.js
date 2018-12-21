const express=require('express')
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secretk=require('../../config/mLabConnector');
const passport=require('passport');
const Owner=require('../../models/Owners');
var kafka = require('../../kafka/client');

const validateSignup=require('../../validation/signup');
const validateLogin=require('../../validation/login');


router.post('/ownersignup',(req,res)=>{

    // console.log("Inside Owner's signup");
    
    // const {errors,validOrNot}=validateSignup(req.body);

    // if(!validOrNot){
    //     console.log("Error: Something is invalid");
    //     return res.status(400).json(errors);
    // }

    //  Owner.findOne({emailID:req.body.emailID})
    //     .then(owner=>{
    //         if(owner){
    //             // res.code="400";
    //             // res.value="The email you entered already exists. Please enter another email"
    //             // console.log("Duplicate Email while signup ",res.value);
    //             // res.sendStatus(400).end();
    //             errors.emailID='Email already exists'
    //             return res.status(400).json(errors);
    //         }else{
    //             const newOwner=new Owner({
    //                 firstName:req.body.firstName,
    //                 lastName:req.body.lastName,
    //                 emailID:req.body.emailID,
    //                 password:req.body.password,
    //                 isOwner:req.body.isOwner
    //             });

    //             bcrypt.genSalt(15,(err,salt)=>{
    //                 bcrypt.hash(newOwner.password,salt,(err,hash)=>{
    //                     if(err) throw err;
    //                     newOwner.password=hash;
    //                     newOwner.save()
    //                         .then(res.json({
    //                             owner:newOwner
    //                         }))
    //                         .catch(err=>console.log(err));
    //                 })
    //             })
    //         }
    //     })

    kafka.make_request('ownersignup',req.body, function(err,results){
        console.log('in result');
        console.log("Results in backedn",results);
        if (err){
            console.log("Inside err");
            // res.json({
            //     status:"error",
            //     msg:"System Error, Try Again."
            // })
            //res.json(err)
            console.log("errors")
            // return res.status(400).json(err);
        }else{
          

            if(results.success)
            {
                res.end(JSON.stringify(results));
            }else{
                res.status(400).json(results)
            }
            }
        
    });
})



router.post('/ownerlogin',(req,res)=>{

    // console.log("Inside Owner's Login");
    // const {errors,validOrNot}=validateLogin(req.body);

    // if(!validOrNot){
    //     console.log("Error: Something is invalid");
    //     return res.status(400).json(errors);
    // }
    // const emailID = req.body.emailID;
    // const password=req.body.password;
    // console.log(emailID, password)
    // Owner.findOne({emailID:emailID})
    //     .then(exiuser=>{
    //         console.log(exiuser)
    //         if(exiuser){
    //             console.log("user exisit now cheking pass")
    //             bcrypt.compare(password,exiuser.password)
    //                 .then(matched=>{
    //                     console.log("Passowrd",matched)
    //                     if(matched){
    //                         // res.json({msg:"Successfully signed in"})
    //                         const userInfo={
    //                             id:exiuser.id,
    //                             emailID:exiuser.emailID ,
    //                             isOwner:exiuser.isOwner,
    //                             firstName:exiuser.firstName,
    //                             lastName:exiuser.lastName

    //                         };
    //                         console.log("USerinfo",userInfo)
    //                         jwt.sign(userInfo,secretk.secret,{expiresIn : 3600},(errorjwt,token)=>{
    //                             //token1 = token
    //                             console.log("token generated", token)
    //                             return res.status(200).json({
    //                                 success:true,
    //                                 token:'Bearer '+token
    //                             });
    //                         });
                           
    //                     }else{
    //                         errors.password="Password does not match the authenticated email ID";
    //                         return res.status(400).json(errors);
    //                     }
    //                 })
    //         }else{
    //             errors.emailID='Email not found'
    //             return res.status(400).json(errors)
    //         }

    //     })

    kafka.make_request('ownerlogin',req.body, function(err,results){
        console.log('in result');
        console.log("Results in backedn",results);
        if (err){
            console.log("Errors");
            // res.json({
            //     status:"error",
            //     msg:"System Error, Try Again."
            // })

        }else{
          

            if(results.success)
            {
                res.end(JSON.stringify(results));
            }else{
                res.status(400).json(results)
            }
            }
        
    });
    
})







module.exports = router;
