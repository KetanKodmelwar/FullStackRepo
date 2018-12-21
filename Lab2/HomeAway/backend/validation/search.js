const Validator=require('validator');
const isEmpty=require('./empty');

module.exports=function validateSearch(values){
    let errors={}

    //This is out isEmpty object where the string is checked if it is empty or not 
    values.loc_search=!isEmpty(values.loc_search) ? values.loc_search : '';
    values.arrive_date=!isEmpty(values.arrive_date) ? values.arrive_date: '';
    values.checkout_date=!isEmpty(values.checkout_date) ? values.checkout_date : '';
    values.guests=!isEmpty(values.guests) ? values.guests : '';
    

    if(Validator.isEmpty(values.loc_search)){
        errors.loc_search='Location cannot be empty';
    }

 

    if(Validator.isEmpty(values.arrive_date)){
        errors.arrive_date='Date of Arrival cannot be empty';
    }

    if(Validator.isEmpty(values.checkout_date)){
        errors.checkout_date='Date of Checkout cannot be empty';
    }

    if(Validator.isEmpty(values.guests)){
        errors.guests='Guests cannot be empty';
    }

   
    

    return{
        errors:errors,
        validOrNot: isEmpty(errors)
        
    }
}