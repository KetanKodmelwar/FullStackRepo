const Validator=require('validator');
const isEmpty=require('./empty');

module.exports=function validateSignup(values){
    let errors={}

    //This is out isEmpty object where the string is checked if it is empty or not 
    values.emailID=!isEmpty(values.emailID) ? values.emailID : '';
    values.password=!isEmpty(values.password) ? values.password: '';
    values.firstName=!isEmpty(values.firstName) ? values.firstName : '';
    values.lastName=!isEmpty(values.lastName) ? values.lastName: '';


    

   

    if(!Validator.isLength(values.emailID,{min:2,max:30})){
        errors.emailID="Email id must be between 2 and 30 characters";
    }

    if(Validator.isEmpty(values.emailID)){
        errors.emailID='Email cannot be empty';
    }

   

    if(!Validator.isLength(values.password,{min:6,max:15})){
        errors.password="Password must be between 6 and 15 characters";
    }

    if(Validator.isEmpty(values.password)){
        errors.password='Password cannot be empty';
    }

    if(Validator.isEmpty(values.firstName)){
        errors.firstName='First Name cannot be empty';
    }

    if(Validator.isEmpty(values.lastName)){
        errors.lastName='Last Name cannot be empty';
    }

    return{
        errors:errors,
        validOrNot: isEmpty(errors)
        
    }
}