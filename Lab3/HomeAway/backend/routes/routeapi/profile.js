const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');
var kafka = require('../../kafka/client');
const validateProfile=require('../../validation/profile');


const user=require('../../models/User');
const Profile=require('../../models/Profile');


router.post('/getProfile',passport.authenticate('jwt',{session:false}),(req,res)=>{

    console.log("Inside Profile method");
    //we are using req.user because after authentication the user info is in req
    console.log(req.user.id);
    Profile.findOne({user:req.user.id})
        .then(exiprofile=>{
            if(!exiprofile){
                //res.status(404).json({Profile:"Profile not found"})
                const newProfile=new Profile({
                    user:req.user.id,
                    firstName:req.user.firstName,
                    lastName:req.user.lastName
                })

                newProfile.save()
                    // .then(res.status(200).json({Profile:"Profile created successfully"}));
                    .then(res.json({profile:newProfile}))
                    .catch(err=>{console.log(err)})
            }

             res.json(exiprofile)
        })
        .catch(err=>res.status(404).json({err:"Error here"} ));

    // kafka.make_request('getprofile',req.body, function(err,results){
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
          

    //             res.end(JSON.stringify(results));
    //         }
        
    // });


})
 
router.post('/updateProfile',passport.authenticate('jwt',{session:false}),(req,res)=>{

    const{errors,validOrNot}=validateProfile(req.body);
    if(!validOrNot){
        console.log("Error: Something is invalid");
        return res.status(400).json(errors);
    } 


    const profileData={}
    profileData.user=req.user.id;
    profileData.firstName=req.user.firstName;
    profileData.lastName=req.user.lastName;
   if(req.body.city) {profileData.city=req.body.city;}
   if(req.body.aboutMe) {profileData.aboutMe=req.body.aboutMe;}
   if(req.body.company) {profileData.company=req.body.company;}
   if(req.body.school) {profileData.school=req.body.school;}
   if(req.body.hometown) {profileData.hometown=req.body.hometown}
   if(req.body.gender) {profileData.gender=req.body.gender}
   if(req.body.languages) {profileData.languages=req.body.languages}
   if(req.body.phone) {profileData.phone=req.body.phone}

   Profile.findOne({user:req.user.id})
    .then(profile=>{
        if(profile){
            
            Profile.findOneAndUpdate({user:req.user.id},{$set:profileData},{new:true})
                .then(profile=>res.json(profile))
        }else{
            new Profile(profileData).save()
                .then(profile=>res.json(profile));
        }
    })

// kafka.make_request('updateprofile',req.body, function(err,results){
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
      

//             res.end(JSON.stringify(results));
//         }
    
// });
})
module.exports=router;

