let express = require('express');
let app = express();

let http = require('http').createServer(app);
let io = require('socket.io')(http);
let dbo = require('./database/conn');

var port = process.env.PORT || 8080;

const path = require('path')
const fs = require('fs')
const formidable = require('formidable');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const req = require('express/lib/request');
const mongoURL = 'mongodb+srv://praavi:Sripa2709@cluster0.cnrl8.mongodb.net/Blinds-Calc?retryWrites=true&w=majority'

/*app.listen(8080, function () {
  console.log('Listening on port 8080');
});*/

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connection to mongodb Atlas is successful'))
  .catch(err => console.log(err));

const sit725_collection = mongoose.model('Blinds-Calc',
  new mongoose.Schema({ url: String, text: String, id: Number }),
  'sit725-group')

app.use('/', express.static(path.join(__dirname, 'sit725-t3-Blinds-Cal')));

app.use(express.static(__dirname + '/public'));
app.use(express.json());

//Configure express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));

//GET FUNCTIONS
app.get('/api', async (req, res) => {
  try {
    const ranges = await sit725_collection.find({});
    
    res.status(200)
      .json(ranges)
  } catch (error) {
    res.status(500)
      .json({
        status: 'Fail',
        message: error,
      })
  }
})

app.get("/test", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});
const emails = [];

for(let id = 1; id < 10; id++){
  emails.push({
    emailId: id,
    email_address: ''
  });

}

app.get('/login', function(request, response) {
  response.redirect('/login.html');
});

app.get("/email_subscribers", function (request, response){
  let db = dbo.getDB();
  db.collection("email_subscribers").find({}).toArray(function (err, result) {
    console.log(result);
    response.send(result);
  });
})

//POST FUNCTIONS
app.post('/api', (req, res) => {
  try {
    form = new formidable.IncomingForm();
    form.parse(req, async (err, { range, cost, description }, { image }) => {

      const newpath = 'img/ranges_img/' + image.originalFilename;
      //fs.renameSync(image.filepath, 'sit725-t3-Blinds-Cal/' + newpath)

      const item = await sit725_collection.collection.insertOne({
        name: range,
        cost,
        description,
        img_url: newpath
      })
      res.status(201)
        .json(item)
    });

  } catch (error) {
    res.status(500)
      .json({
        status: 'Fail',
        message: error,
      })
  }
})

app.post('/login', function(request, response) {
  let username = request.body.username;
  let password = request.body.password;
  let db = dbo.getDB();
  let query = {"username": username, "password": password};
  db.collection("admins").findOne(query, function(err, doc) {
    if (err) {
      console.log(err);
    }
    if (doc) {
      response.redirect("/ranges.html");
    } else {
      response.send('Wrong username or password');
    }
  });
  
});

app.post("/email_subscribers", function (request, response){
  if(!request.body) {
    console.log('Does not exist');
    response.sendStatus(500);
  }
    
  let email = request.body.email;
  console.log(dbo);
  let db = dbo.getDB();
  let entry = {"email": email};

  db.collection("email_subscribers").insert(entry, function(err, response) {
    if (err) {
      console.log(err);
    }
    console.log("subscriber added");
  });
 emails.push(request.body);
  response.sendStatus(204);
  console.log(request.body);
});

app.post("/unsubscribe/:email", function(request, response) {
  let email = request.params.email;
  console.log(email);
  let query = {"email": email};
  let db = dbo.getDB();
  db.collection('email_subscribers').deleteMany(query);
  response.send('Unsubscribed');
});

//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});

dbo.connect((err) => {
  if(err){
    console.error(err);
    process.exit();
  }
  http.listen(port, () => { 
    console.log("Listening on port ", port);
  });
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();