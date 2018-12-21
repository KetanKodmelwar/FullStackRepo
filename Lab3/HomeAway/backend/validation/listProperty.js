const Validator=require('validator');
const isEmpty=require('./empty');

module.exports=function validatelistProperty(values){
    let errors={}

    //This is out isEmpty object where the string is checked if it is empty or not 
    values.myprop_location=!isEmpty(values.myprop_location) ? values.myprop_location : '';
    values.myprop_headline=!isEmpty(values.myprop_headline) ? values.myprop_headline: '';
    values.myprop_description=!isEmpty(values.myprop_description) ? values.myprop_description : '';
    values.myprop_bedrooms=!isEmpty(values.myprop_bedrooms) ? values.myprop_bedrooms: '';
    values.myprop_accomodates=!isEmpty(values.myprop_accomodates) ? values.myprop_accomodates: '';
    values.myprop_bathrooms=!isEmpty(values.myprop_bathrooms) ? values.myprop_bathrooms: '';
    values.myprop_pricing=!isEmpty(values.myprop_pricing) ? values.myprop_pricing: '';
    values.cleanFee=!isEmpty(values.cleanFee) ? values.cleanFee: '';
    values.available_startDate=!isEmpty(values.available_startDate) ? values.available_startDate: '';
    values.available_endDate=!isEmpty(values.available_endDate) ? values.available_endDate: '';
    


    

   

    if(!Validator.isLength(values.myprop_location,{min:2,max:50})){
        errors.myprop_location="Location must be between 2 and 50 characters";
    }

    if(Validator.isEmpty(values.myprop_location)){
        errors.myprop_location='Location cannot be empty';
    }

    if(!Validator.isLength(values.myprop_headline,{min:2,max:100})){
        errors.myprop_headline="Location must be between 2 and 100 characters";
    }

    if(Validator.isEmpty(values.myprop_headline)){
        errors.myprop_headline='Headline cannot be empty';
    }

    if(!Validator.isLength(values.myprop_description,{min:2,max:500})){
        errors.myprop_description="Location must be between 2 and 500 characters";
    }

    if(Validator.isEmpty(values.myprop_description)){
        errors.myprop_description='Description cannot be empty';
    }

    if(Validator.isEmpty(values.myprop_bedrooms)){
        errors.myprop_bedrooms='Please enter the number of Bedrooms';
    }
    if(Validator.isEmpty(values.myprop_accomodates)){
        errors.myprop_accomodates='Please enter the number of accomodates';
    }
    if(Validator.isEmpty(values.myprop_bathrooms)){
        errors.myprop_bathrooms='Please enter the number of Bathrooms';
    }
    if(Validator.isEmpty(values.myprop_pricing)){
        errors.myprop_pricing='Please enter a proper price';
    }
    if(Validator.isEmpty(values.cleanFee)){
        errors.cleanFee='Please enter the fee for cleaning the property';
    }
    if(Validator.isEmpty(values.available_startDate)){
        errors.available_startDate='Please enter a proper date when the property will be available';
    }
    if(Validator.isEmpty(values.available_endDate)){
        errors.available_endDate='Please enter a proper date when the property will be available';
    }

    return{
        errors:errors,
        validOrNot: isEmpty(errors)
        
    }
}