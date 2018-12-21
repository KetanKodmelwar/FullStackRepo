const Validator=require('validator');
const isEmpty=require('./empty');



module.exports=function validateQA(values){

    let errors={}

    values.questionHeadline=!isEmpty(values.questionHeadline) ? values.questionHeadline : '';
    values.questionDescription=!isEmpty(values.questionDescription) ? values.questionDescription : '';

    if(Validator.isEmpty(values.questionHeadline)){
        errors.questionHeadline='Please enter some Headline to your Question';
    }

    if(Validator.isEmpty(values.questionDescription)){
        errors.questionDescription='Please enter some Description to your Question';
    }

    return{
        errors:errors,
        validOrNot: isEmpty(errors)
        
    }
}