var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var mysql = require('mysql');
const multer=require('multer');
const path=require('path');
const fs=require('fs');
const uuidv4=require('uuid/v4');    
let curr_session;
let curr_user;
var a=0;



var pool=mysql.createPool({
    connectionLimit:'100',
    port:'3306',
    host:'localhost',
    user:'root',
    password:'',
    database:'myhomeaway'

});


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

 var search_details=
     {
         "loc_search":"",
         "arrive_date":"",
         "checkout_date":"",
         "guests":""
     }
 

     const storage = multer.diskStorage({
        
        destination:(req,file,cb)=>{
            cb(null,'./uploads');
        },
        filename:(req,file,cb) =>{
            console.log("Uploading files at node ",req.files);
            const newIncomingfile=`kmm${uuidv4()}${req.files.length}${path.extname(file.originalname)}`;
            a+=newIncomingfile + " ";
            cb(null,newIncomingfile);
        },
    });
    
    const upload=multer({
        storage,
        limits:{
            fileSize:15000000
        }
    });
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    
  


// app.post('/isauth',function(req,res){
//     console.log("Inside Authentication request");
   
    
//     res.send(req.session.user);


// })

 app.post('/search',function(req,res){
     console.log("Inside the search request");

     search_details={loc_search:req.body.loc_search,arrive_date:req.body.arrive_date,checkout_date:req.body.checkout_date,guests:req.body.guests}
     console.log(search_details);
     
     var sql="SELECT * FROM list_property where myprop_location="+mysql.escape(search_details.loc_search)+" AND arrive_date<="+mysql.escape(search_details.arrive_date)+" AND checkout_date >="+mysql.escape(search_details.checkout_date)+"AND id NOT IN (SELECT myprop_id FROM booked_property)";
    //  var sql="SELECT * FROM list_property where myprop_location="+mysql.escape(search_details.loc_search)+" and NOT ((arrive_date BETWEEN "+mysql.escape(search_details.arrive_date)+" AND "+mysql.escape(search_details.checkout_date)+") OR (checkout_date BETWEEN "+mysql.escape(search_details.checkout_date)+" AND "+mysql.escape(search_details.arrive_date)+"))";
     console.log(sql);
     pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-type':'text/plain'
            })   
            res.end("Could not get the connection object");
        }else{
            con.query(sql,function(err,result){
                console.log(result.length);
                if(err || result.length ===0){
                    console.log(err);
                    res.writeHead(400,{
                        'Content-Type':'text/plain'
                    })
                    res.end("No available spaces");
                }else if(result.length>0){
                    
                    res.writeHead(200,{
                        'Content-Type':'application/json'
                    })
                    console.log("Success: ",JSON.stringify(result));
                    // if(req.session.user!=null){
                    //     res.send("Active")
                    // }else{
                    //     res.send("Inactive")
                    // }
                    if(req.session.user!=null){
                        res.end(JSON.stringify(result));
                    }else{
                        res.end("Inactive");
                    }
                    
                }
            })
        }
    }) 
 })

 app.post('/seebooked',function(req,res){

    console.log("Inside Previously booked properties");

    var sql="SELECT * FROM list_property WHERE id IN (SELECT myprop_id FROM booked_property WHERE bookinguser_id = "+mysql.escape(req.session.userid)+")";

    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-type':'text/plain'
            })   
            res.end("Could not get the connection object");
        }else{
            con.query(sql,function(err,result){
                
                if(err){
                    console.log(err);
                    res.writeHead(400,{
                        'Content-Type':'text/plain'
                    })
                    res.end("Error in showing the property");
                }else if(result.length>0){
                    res.cookie('cookie',"admin",{maxAge:900000, httpOnly:false,path:'/'});
                    
                    res.writeHead(200,{
                        'Content-Type':'text/json'
                    })
                    console.log("Success. Property Posted ");
                    res.end(JSON.stringify(result));
                }
                else{
                    console.log("Properties not yet booked");
                }
            }) 
        }
    })

 })

app.post('/listproperty',function(req,res){


    console.log("Inside List my Property request");

    
    
    var sql="INSERT INTO list_property(myprop_location,myprop_headline,myprop_description,myprop_type,myprop_bedrooms,myprop_accomodates,myprop_bathrooms,myprop_pricing,cleanFee,arrive_date,checkout_date,ownerid) VALUES ("+mysql.escape(req.body.myprop_location)+","+mysql.escape(req.body.myprop_headline)+","+mysql.escape(req.body.myprop_description)+","+mysql.escape(req.body.myprop_type)+","+mysql.escape(req.body.myprop_bedrooms)+","+mysql.escape(req.body.myprop_accomodates)+","+mysql.escape(req.body.myprop_bathrooms)+","+mysql.escape(req.body.myprop_pricing)+","+mysql.escape(req.body.cleanFee)+","+mysql.escape(req.body.arrive_date)+","+mysql.escape(req.body.checkout_date)+","+mysql.escape(req.session.userid)+")";
    console.log(sql);

    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-type':'text/plain'
            })   
            res.end("Could not get the connection object");
        }else{
            con.query(sql,function(err,result){
                
                if(err){
                    console.log(err);
                    res.writeHead(400,{
                        'Content-Type':'text/plain'
                    })
                    res.end("Error in posting the property");
                }else {
                    res.cookie('cookie',"admin",{maxAge:900000, httpOnly:false,path:'/'});
                   
                    console.log("Uploading the photo");
                   
                    res.writeHead(200,{
                        'Content-Type':'text/plain'
                    })
                    console.log("Success. Property Posted ");
                    
                    // res.end(JSON.stringify(result));
                }
            })
        }
    })

   
    
    
});

app.post('/pics',upload.array('selectedFile',5),(req,res)=>{
    console.log("Req",req.files);
    console.log("Req body",req.body);
    console.log("Inside dbpictures"+a);
    console.log("Res: ",res.file);
    res.send();
});




  app.post('/login',function(req,res){
    
    
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
    
    var username=req.body.username;
    var password=req.body.password;
    

    var sql="SELECT * FROM traveller_users where username ="+mysql.escape(username)+" and password="+mysql.escape(password);
//     if (sql.length>0)
//     {   
//         console.log("Error has same cred");

//     }
//     else{
//     console.log(sql);
//     pool.getConnection(function(err,con){
//         if(err){
//             console.log("Cannot Create");
//         }else{
//             console.log("Got Connection Object");
//             con.query(sql,function(err,result){
//                 if(err){
//                     console.log("Invalid username password");
//                 }else{
//                     console.log("Valid Credentials");
//                 }
//             })
//         }
//     });
// }

    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-type':'text/plain'
            })   
            res.end("Could not get the connection object");
        }else{
            con.query(sql,function(err,result){
                console.log(result.length);
                if(err || result.length ===0){
                    console.log(err);
                    res.writeHead(400,{
                        'Content-Type':'text/plain'
                    })
                    res.end("Error while logging in");
                }else if(result.length>0){
                    res.cookie('cookie',"admin",{maxAge:900000, httpOnly:false,path:'/'});
                    req.session.userid=result[0].userid;
                    //req.session.username=result[0].username;
                     req.session.user=result;
                    // console.log("Whole session object: ",req.session.user)
                    console.log("Session userid: ",req.session.userid);
                    console.log("Session user details: ",req.session.user);
                    // console.log("Session userid:",req.session.user.userid);
                    // console.log("Session username: ",req.session.user.username);
                    curr_user=result.firstName;
                    res.writeHead(200,{
                        'Content-Type':'text/plain'
                    })
                    console.log("Success");
                    res.end(JSON.stringify(result));
                }
            })
        }
    }) 
});


app.post('/ownerlogin',function(req,res){
    
    
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
    
    var username=req.body.username;
    var password=req.body.password;
    

    var sql="SELECT * FROM traveller_users where username ="+mysql.escape(username)+" and password="+mysql.escape(password);

    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-type':'text/plain'
            })   
            res.end("Could not get the connection object");
        }else{
            con.query(sql,function(err,result){
                console.log(result.length);
                if(err || result.length ===0){
                    console.log(err);
                    res.writeHead(400,{
                        'Content-Type':'text/plain'
                    })
                    res.end("Error while logging in");
                }else if(result.length>0){
                    res.cookie('cookie',"admin",{maxAge:900000, httpOnly:false,path:'/'});
                    req.session.userid=result[0].userid;
                    //req.session.username=result[0].username;
                     req.session.user=result;
                    // console.log("Whole session object: ",req.session.user)
                    console.log("Session userid: ",req.session.userid);
                    console.log("Session user details: ",req.session.user);
                    // console.log("Session userid:",req.session.user.userid);
                    // console.log("Session username: ",req.session.user.username);
                    curr_user=result.firstName;
                    res.writeHead(200,{
                        'Content-Type':'text/plain'
                    })
                    console.log("Success");
                    res.end(JSON.stringify(result));
                }
            })
        }
    }) 
});


app.post('/book',function(req,res){
    console.log("Inside Booked properties Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
    
    var myprop_id=req.body.myprop_id;
    var bookCheckin_date=req.body.bookCheckin_date;
    var bookCheckout_date=req.body.bookCheckout_date;

    var sql="INSERT INTO booked_property VALUES ("+mysql.escape(myprop_id)+","+mysql.escape(bookCheckin_date)+","+mysql.escape(bookCheckout_date)+","+mysql.escape(req.session.userid)+")";
    console.log(sql);
    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-type':'text/plain'
            })   
            res.end("Could not get the connection object");
        }else{
            con.query(sql,function(err,result){
                console.log(result.length);
                if(err){
                    console.log(err);
                    res.writeHead(400,{
                        'Content-Type':'text/plain'
                    })
                    res.end("Error while booking");
                }else {
                    res.cookie('cookie',"admin",{maxAge:900000, httpOnly:false,path:'/'});
                   
                    res.writeHead(200,{
                        'Content-Type':'text/plain'
                    })
                    console.log("Booked successfully");
                    res.end("Booked successfully");

                    
                }
            })
        }
    })

})



app.post('/signup',function(req,res){
    console.log("Inside Signup request")

    // var sql="INSERT INTO signup_users VALUES ( "+mysql.escape(req.body.firstName)+","+mysql.escape(req.body.lastName)+","+mysql.escape(req.body.emailID)+","+mysql.escape(req.body.password) + ")";
    var sql="INSERT INTO traveller_users(username,password,firstName,lastName,isOwner) VALUES ( "+mysql.escape(req.body.emailID)+","+mysql.escape(req.body.password)+","+mysql.escape(req.body.firstName)+","+mysql.escape(req.body.lastName) +","+mysql.escape(req.body.isOwner)+ ")";

    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-type':'text/plain'
            })
            res.end("Could not get connection object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-type':'text/plain'
                    })
                    res.end("Not entered properly")
                }else{
                    res.cookie('cookie',"admin",{maxAge:900000, httpOnly:false,path:'/'});
                   
                    res.writeHead(200,{
                        'Content-Type':'text/plain'
                    })
                    res.end("Successfully changed the signup details")
                }
            })
        }
    })
})


app.post('/ownersignup',function(req,res){
    console.log("Inside Signup request")

    // var sql="INSERT INTO signup_users VALUES ( "+mysql.escape(req.body.firstName)+","+mysql.escape(req.body.lastName)+","+mysql.escape(req.body.emailID)+","+mysql.escape(req.body.password) + ")";
    var sql="INSERT INTO traveller_users(username,password,firstName,lastName,isOwner) VALUES ( "+mysql.escape(req.body.emailID)+","+mysql.escape(req.body.password)+","+mysql.escape(req.body.firstName)+","+mysql.escape(req.body.lastName) +","+mysql.escape(req.body.isOwner)+ ")";

    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-type':'text/plain'
            })
            res.end("Could not get connection object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-type':'text/plain'
                    })
                    res.end("Not entered properly")
                }else{
                    res.cookie('cookie',"admin",{maxAge:900000, httpOnly:false,path:'/'});
                    
                    res.writeHead(200,{
                        'Content-Type':'text/plain'
                    })
                    res.end("Successfully changed the signup details")
                }
            })
        }
    })
})

app.post('/profile',function(req,res){

    console.log("Inside Profile request")

    var sql= "UPDATE traveller_users SET firstName ="+mysql.escape(req.body.firstName)+",lastName="+mysql.escape(req.body.lastName)+",aboutMe="+mysql.escape(req.body.aboutMe)+",city="+mysql.escape(req.body.city)+",company="+mysql.escape(req.body.company)+",school="+mysql.escape(req.body.school)+",hometown="+mysql.escape(req.body.hometown)+",gender="+mysql.escape(req.body.gender)+",languages="+mysql.escape(req.body.languages)+",phone="+mysql.escape(req.body.phone)+ " where userid="+mysql.escape(req.session.userid);
    console.log(sql);

    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-type':'text/plain'
            })   
            res.end("Could not get the connection object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type':'text/plain'
                    })
                    res.end("Error while inserting profile")
                }else{
                    res.cookie('cookie',"admin",{maxAge:900000, httpOnly:false,path:'/'});
                    req.session.user=result;
                    res.writeHead(200,{
                        'Content-Type':'text/plain'
                    })
                    console.log("Successfully changed the profile details")
                    res.end(curr_user);
                }
            })
        }
    })
})

app.post('/loadprofile',function(req,res){

    console.log("Inside the loader of Profile");

    var sql="SELECT firstName,lastName,aboutMe,city,company,school,hometown,gender,languages,phone FROM traveller_users where userid = "+mysql.escape(req.session.userid);
    console.log(sql);

    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-type':'text/plain'
            })   
            res.end("Could not get the connection object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type':'text/plain'
                    })
                    res.end("Error while retreving the profile")
                }else{
                    res.cookie('cookie',"admin",{maxAge:900000, httpOnly:false,path:'/'});
                    req.session.user=result;
                    res.writeHead(200,{
                        'Content-Type':'text/plain'
                    })
                    console.log("Successfully retrieved the files")
                    res.end(JSON.stringify(result));
                }
            })
        }
    })
    
})


app.post('/logout',function(req,res){
    console.log("Inside Logout request");

    if(req.session.userid!=null){
        req.session.destroy();
        console.log("User successfully logged out: ",req.session);

        res.end();
    }else{
        console.log("User not yet logged in. Hence cannot logout");
    }
})






app.post('/download/:file(*)',(req,res)=>{
    console.log("Inside download file");

    var file=req.params.file;
    var fileLocation=path.join(__dirname + '/uploads',file);
    var img=fs.readFileSync(fileLocation);
    var base64img=new Buffer(img).toString('base64');
    res.writeHead(200,{'Content-Type':'image/jpg'});
    res.end(base64img);

});








app.listen(3001);
console.log("Server Listening on port 3001");