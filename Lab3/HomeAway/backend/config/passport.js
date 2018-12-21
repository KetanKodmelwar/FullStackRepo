const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const mongoose=require('mongoose');
const User=mongoose.model('users');
const Owner= mongoose.model('owners');
const keys=require('../config/mLabConnector');

const opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=keys.secret;

// module.exports=passport=>{
//     passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
//         // console.log(jwt_payload);

//         User.findById(jwt_payload.id)
//             .then(user=>{
//                 if(user){
//                     return done(null,user);
//                 }else{
//                     return done(null,false);
//                 }
//             })
//             .catch(err=>{
//                 console.log("passport error",err);
//             }); 

//     }))

//     passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
//         // console.log(jwt_payload);

//         Owner.findById(jwt_payload.id)
//             .then(user=>{
//                 if(user){
//                     return done(null,user);
//                 }else{
//                     return done(null,false);
//                 }
//             })
//             .catch(err=>{
//                 console.log("passport error",err);
//             }); 

//     }))
// }

module.exports=passport=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        // console.log(jwt_payload);

        User.findById(jwt_payload.id)
            .then(user=>{
                if(user){
                    
                    return done(null,user);
                }else{
                    //return done(null,false);

                    Owner.findById(jwt_payload.id)
                        .then(user=>{
                            if(user){
                                return done(null,user);
                            }else{
                                return done(null,false);
                            }
                        })
                        .catch(err=>{
                            console.log("passport error in owner",err);
                        })
                }
            })
            .catch(err=>{
                console.log("passport error",err);
            }); 

    }))

   
}
