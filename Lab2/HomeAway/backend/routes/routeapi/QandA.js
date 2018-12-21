const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');
const validateQandA=require('../../validation/QandA')

const user=require('../../models/User');
const QandA=require('../../models/QA');
const QandA2=require('../../models/QA2');


router.post('/question',passport.authenticate('jwt',{session:false}),(req,res)=>{

    console.log("Inside questioning area");
    const{errors,validOrNot}=validateQandA(req.body);
    if(!validOrNot){
        console.log("Error: Something is invalid");
        return res.status(400).json(errors);
    } 

    const QandAdata=new QandA({
        user:req.user.id,
        questionHeadline:req.body.questionHeadline,
        questionDescription:req.body.questionDescription,
        owner_id:req.body.owner_id

    })


    QandAdata.save()
        .then(question=>res.json(question))
        .catch(err=>{console.log(err)});


});

router.post('/getQuestionsandAnswers',passport.authenticate('jwt',{session:false}),(req,res)=>{

    console.log("Inside fetching questionare for traveller");

    QandA.find({user:req.user.id})
        .then(exiQuestionare=>res.json(exiQuestionare))
        .catch(err=>res.json(err="Found no questions and answers"))
})


router.post('/getQuestions',passport.authenticate('jwt',{session:false}),(req,res)=>{

    console.log("Inside fetching questionare for owner");
    console.log("User id",req.user.id);
    QandA2.find({owner_id:req.user.id})
        .then(exiQuestionare=>res.json(exiQuestionare))
        .catch(err=>res.json(err="Found no questions and answers"))
})



router.post('/answer',passport.authenticate('jwt',{session:false}),(req,res)=>{

    console.log("Inside writing the answer of the owner");
    console.log("receidved data",req.body);
    console.log("Question id",req.body.questionID);

    const answeredData={}
    answeredData.answer=req.body.answer

    QandA2.findOneAndUpdate({_id:req.body.questionID},{$set:answeredData},{new:true})
        .then(answer=>res.json(answer));
        
})

module.exports=router;
