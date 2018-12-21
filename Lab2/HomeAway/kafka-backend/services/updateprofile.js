const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

const validateProfile=require('../validation/profile');
const Profile=require('../models/Profile');


function handle_request(msg, callback){
   
    const{errors,validOrNot}=validateProfile(msg);
    if(!validOrNot){
        console.log("Error: Something is invalid");
        // return res.status(400).json(errors);
        callback(null,[])
    } 


    const profileData={}
    profileData.user=msg.user_id;
    profileData.firstName=msg.firstName;
    profileData.lastName=msg.lastName;
   if(msg.city) {profileData.city=msg.city;}
   if(msg.aboutMe) {profileData.aboutMe=msg.aboutMe;}
   if(msg.company) {profileData.company=msg.company;}
   if(msg.school) {profileData.school=msg.school;}
   if(msg.hometown) {profileData.hometown=msg.hometown}
   if(msg.gender) {profileData.gender=msg.gender}
   if(msg.languages) {profileData.languages=msg.languages}
   if(msg.phone) {profileData.phone=msg.phone}

   Profile.findOne({user:msg.user_id})
    .then(profile=>{
        if(profile){
            
            Profile.findOneAndUpdate({user:msg.user_id},{$set:profileData},{new:true})
                // .then(profile=>res.json(profile))
                .then(callback(null,profile))
        }else{
            new Profile(profileData).save()
                // .then(profile=>res.json(profile));
                .then(callback(null,profile))
        }
    })
    
};

exports.handle_request = handle_request;