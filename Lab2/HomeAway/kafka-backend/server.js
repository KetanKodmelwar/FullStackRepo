var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
const mongoose=require('mongoose');
var Login = require('./services/login.js');
var ownerLogin =require('./services/ownerlogin');
var Signup=require('./services/signup');
var ownerSignup=require('./services/ownersignup');
var getProfile=require('./services/getprofile');
var updateProfile=require('./services/updateprofile');
//var getProperty=require('./services/getproperty');
// var searchProperty=require('./services/searchproperty');
var listing=require('./services/listing');


const db=require('./config/mLabConnector.js').mongoURI;

mongoose.Promise=global.Promise;

mongoose.connect(db)
            .then(()=>{console.log("Connected to Mlab Mongodb")})
            .catch(err=>{console.log(err)});


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        console.log("daata",data);
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            console.log("Server payload ",payloads);
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("login",Login)
handleTopicRequest("ownerlogin",ownerLogin)
handleTopicRequest("signup",Signup)
handleTopicRequest("ownersignup",ownerSignup)
handleTopicRequest("getprofile",getProfile)
handleTopicRequest("updateprofile",updateProfile)
// handleTopicRequest("searchproperty",searchProperty)
//handleTopicRequest("getproperty",getProperty)
handleTopicRequest("listing",listing)


