const graphql=require('graphql');
const _=require('lodash');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const User=require('../models/User');
const Profile=require('../models/Profile');
const listProperty=require('../models/ListProp');

const {GraphQLObjectType,
       GraphQLString,
       GraphQLSchema,
       GraphQLID,
       GraphQLFloat,
       GraphQLList,
       GraphQLInt,
       GraphQLNonNull
}=graphql;

// mongoose.connect('mongodb://ketan:password123@ds031847.mlab.com:31847/myhomeaway')

// mongoose.connection.once('open',()=>{
//     console.log("Connected to Mlab")
// })

// var users=[
//     {id:'1',firstName:"Ketan", lastName:"Kodmelwar", emailID:"ketankodmelwar@gmail.com", password:"password",profileID:'1'},
//     {id:'2',firstName:"Aniket", lastName:"Chandak", emailID:"aniketchandak@gmail.com", password:"aniket",profileID:'2'},
//     {id:'3',firstName:"Prashant", lastName:"Pardeshi", emailID:"prashant@gmail.com", password:"prashant",profileID:'3'}

// ];

// var profiles=[
//     {id:'1',firstName:"Ketan", lastName:"Kodmelwar", aboutMe:"I am fond of icecream",city:"India",company:"Accenture",gender:"Male",hometown:"Nashik",languages:"English,Marathi",phone:"6692828705",school:"NCHS"},
//     {id:'2',firstName:"Aniket", lastName:"Chandak", aboutMe:"Yoooo",city:"India",company:"GS",gender:"Male",hometown:"Nashik",languages:"English,Marathi",phone:"1234567890",school:"Nav Rachna"},
//     {id:'3',firstName:"Prashant", lastName:"Pardeshi", aboutMe:"Errr",city:"India",company:"IBM",gender:"Male",hometown:"Pune",languages:"English,Marathi",phone:"7894561230",school:"NA"}
// ]

// var properties=[
//     {user_id:'1',myprop_location: "San Jose",myprop_headline: "Villa Torino",myprop_description: "A much awaited place to look for. Is work friendly and also in the heart of downtown",myprop_type: "Condo",myprop_bedrooms: 3,myprop_accomodates: 7,myprop_bathrooms: 3,myprop_pricing: 210,cleanFee: 10,available_startDate:"2018-11-15T00:00:00.000Z",available_endDate: "2018-11-22T00:00:00.000Z"},
//     {user_id:'2',myprop_location: "San Jose",myprop_headline: "Cmpe273",myprop_description: "cmpe273",myprop_type: "condo",myprop_bedrooms: 2,myprop_accomodates: 5,myprop_bathrooms: 2,myprop_pricing: 210,cleanFee: 10,available_startDate:"2018-11-08T00:00:00.000",available_endDate:"2018-11-15T00:00:00.000Z"},
//     {user_id:'3',myprop_location: "San Diego",myprop_headline: "Cmpe273",myprop_description: "cmpe273",myprop_type: "condo",myprop_bedrooms: 2,myprop_accomodates: 5,myprop_bathrooms: 2,myprop_pricing: 210,cleanFee: 10,available_startDate:"2018-11-08T00:00:00.000",available_endDate:"2018-11-15T00:00:00.000Z"}
// ]

const UserType=new GraphQLObjectType({
    name:'User',
    fields:()=>({
        id:{type:GraphQLID},
        firstName:{type:GraphQLString},
        lastName:{type:GraphQLString},
        emailID:{type:GraphQLString},
        password:{type:GraphQLString},
        profile:{
            type:ProfileType,
            resolve(parent,args){
                console.log(parent)
                //return _.find(profiles,{id:parent.profileID})
            }
        }
    })
})

const ProfileType=new GraphQLObjectType({
    name:'Profile',
    fields:()=>({
        
        id:{type:GraphQLID},
        firstName:{type:GraphQLString},
        lastName:{type:GraphQLString},
        emailID:{type:GraphQLString},
        aboutMe:{type:GraphQLString},
        city:{type:GraphQLString},
        company:{type:GraphQLString},
        gender:{type:GraphQLString},
        hometown:{type:GraphQLString},
        languages:{type:GraphQLString},
        phone:{type:GraphQLFloat},
        school:{type:GraphQLString}
    })
})



const PropertyType=new GraphQLObjectType({
    name:'Property',
    fields:()=>({
        user_id:{type:GraphQLString},
        myprop_location:{type:GraphQLString},
        myprop_headline:{type:GraphQLString},
        myprop_description:{type:GraphQLString},
        myprop_type:{type:GraphQLString},
        myprop_bedrooms:{type:GraphQLInt},
        myprop_accomodates:{type:GraphQLInt},
        myprop_bathrooms:{type:GraphQLInt},
        myprop_pricing:{type:GraphQLFloat},
        cleanFee:{type:GraphQLInt},
        available_startDate:{type:GraphQLString},
        available_endDate:{type:GraphQLString}

    })
})

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{emailID:{type:GraphQLString}, password:{type:GraphQLString}},
            resolve(parent,args){
                //return _.find(users,{emailID:args.emailID, password:args.password});
                // return User.find({emailID:args.emailID, password:args.password})
                // var password=args.password;
                //  User.find({emailID:args.emailID})
                //     .then(user=>{
                //         if(user){
                //             console.log(user)
                            
                //             bcrypt.compare(password,user.password)
                //                 .then(matched=>{
                //                     // return user;
                //                     console.log("Matched")
                //                 })

                //         }
                //         return user;
                //     })
                console.log("email",args.emailID);
                console.log("password",args.password);
                //console.log(User.find({emailID:args.emailID},{password:args.password}));
                return User.findOne({emailID:args.emailID,password:args.password})
            }
        },
        profile:{
            type:ProfileType,
            args:{
                user_id:{type:GraphQLString},
                firstName:{type:GraphQLString},
                lastName:{type:GraphQLString},
                emailID:{type:GraphQLString},
                aboutMe:{type:GraphQLString},
                city:{type:GraphQLString},
                company:{type:GraphQLString},
                gender:{type:GraphQLString},
                hometown:{type:GraphQLString},
                languages:{type:GraphQLString},
                phone:{type:GraphQLFloat},
                school:{type:GraphQLString}
            },
            resolve(parent,args){
               // return _.find(profiles,{id:args.id, firstName:args.firstName});
               return Profile.findOneAndUpdate({user_id:args._id}),
               {
                   firstName:args.firstName,
                   lastName:args.lastName,
                   emailID:args.emailID,
                   aboutMe:args.aboutMe,
                   city:args.city,
                   company:args.company,
                   gender:args.gender,
                   hometown:args.hometown,
                   languages:args.languages,
                   phone:args.phone,
                   school:args.school
               }
               
            }
        },
        properties:{
            type:new GraphQLList(PropertyType),
            args:{
                myprop_location:{type:GraphQLString}
            },
            resolve(parent,args){
                console.log("Inside the backend of properties in graphql");
                console.log(args)
               return listProperty.find({myprop_location:args.myprop_location,isBooked:"no"})
              
            }
        },
        travelerProperty:{
            type:new GraphQLList(PropertyType),
            args:{
                user_id:{type:GraphQLString}
            },
            resolve(parent,args){
                console.log("Inside the traveler dashboard on graphql");
                return listProperty.find({user_id:args.user_id});
            }
        }
    }
})

const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser:{
            type:UserType,
            args:{
                firstName:{type: new GraphQLNonNull (GraphQLString)},
                lastName:{type:new GraphQLNonNull (GraphQLString)},
                emailID:{type:new GraphQLNonNull (GraphQLString)},
                password:{type:new GraphQLNonNull (GraphQLString)}
            },
            resolve(parent,args){
                let newUser=new User({
                    firstName:args.firstName,
                    lastName:args.lastName,
                    emailID:args.emailID,
                    password:args.password
                });

            //    bcrypt.genSalt(15,(err,salt)=>{
            //        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            //            if(err) throw err;
            //            newUser.password=hash;
            //           console.log("inside Hash",newUser)
            //           newUser.save()
            //             .then(result=>{
            //                 console.log("Return promise")
                            
            //             })
            //        })
            //    })
            newUser.save()
               console.log("Outside user efore return",newUser)
               return newUser;

            
                
            }
                
        }
    }
})


module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation

})