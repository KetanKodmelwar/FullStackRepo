const Validator=require('validator');
const isEmpty=require('./empty');

module.exports=function validateProfile(values){
    let errors={}

    //This is out isEmpty object where the string is checked if it is empty or not 
    values.firstName=!isEmpty(values.firstName) ? values.firstName : '';
    values.lastName=!isEmpty(values.lastName) ? values.lastName: '';
    values.hometown=!isEmpty(values.hometown) ? values.hometown: '';

    if(Validator.isEmpty(values.hometown)){
        errors.hometown='Please enter your hometown';
    }

 

    if(Validator.isEmpty(values.firstName)){
        errors.firstName='Enter your First Name';
    }

    if(Validator.isEmpty(values.lastName)){
        errors.lastName='Enter your last Name';
    }
    

    return{
        errors:errors,
        validOrNot: isEmpty(errors)
        
    }
}