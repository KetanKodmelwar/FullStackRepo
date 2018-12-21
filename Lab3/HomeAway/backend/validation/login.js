const Validator=require('validator');
const isEmpty=require('./empty');

module.exports=function validateLogin(values){
    let errors={}

    //This is out isEmpty object where the string is checked if it is empty or not 
    values.emailID=!isEmpty(values.emailID) ? values.emailID : '';
    values.password=!isEmpty(values.password) ? values.password: '';
    

    if(Validator.isEmpty(values.emailID)){
        errors.emailID='Email cannot be empty';
    }

 

    if(Validator.isEmpty(values.password)){
        errors.password='Password cannot be empty';
    }

   
    

    return{
        errors:errors,
        validOrNot: isEmpty(errors)
        
    }
}