var express = require('express');
var app = express();
const mongoose=require('mongoose');
var bodyParser = require('body-parser'); 
const passport=require('passport');
var session = require('express-session');
var cors = require('cors');
const graphqlHTTP=require('express-graphql');

const path = require('path');
const fs = require('fs');
const multer = require('multer');
var newFilename=" ";

const schema=require('./schema/schema');

const users=require('./routes/routeapi/users');
const profile=require('./routes/routeapi/profile');
const owners=require('./routes/routeapi/owners');
const listProperty=require('./routes/routeapi/listProperty');
const searchProperty=require('./routes/routeapi/searchProperty');
const QandA=require('./routes/routeapi/QandA');
const book=require('./routes/routeapi/book');



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

const db=require('./config/mLabConnector.js').mongoURI;

mongoose.Promise=global.Promise;

mongoose.connect(db)
            .then(()=>{console.log("Connected to Mlab Mongodb")})
            .catch(err=>{console.log(err)});



app.use(passport.initialize());

require('./config/passport.js')(passport);


app.use('/graphql',graphqlHTTP({
  schema:schema,
  graphiql:true
}))

//Routes
app.use('/routeapi/users',users);
app.use('/routeapi/profile',profile);
app.use('/routeapi/owners',owners);
app.use('/routeapi/listProperty',listProperty);
app.use('/routeapi/searchProperty',searchProperty);
app.use('/routeapi/QandA',QandA);
app.use('/routeapi/book',book);




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {

     // const newFilename = `test${path.extname(file.originalname)}`;
     newFilename = file.originalname;
      cb(null, newFilename);
    },
  });

  const upload = multer({ storage });
app.post('/addPics', upload.single
  ('selectedFile'), (req, res) => {
    //console.log("Req : ",req);
   // console.log(property);
    console.log("Res : ",res.file);
    res.send( newFilename); 
    });


    app.post('/download/:file(*)',(req, res) => {
      console.log("Inside download file");
      var file = req.params.file;
      var fileLocation = path.join(__dirname + '/uploads',file);
      var img = fs.readFileSync(fileLocation);
      var base64img = new Buffer(img).toString('base64');
      res.writeHead(200, {'Content-Type': 'image/png' });
      res.end(base64img);
    });




app.listen(3001);
console.log("Server running on port 3001");
