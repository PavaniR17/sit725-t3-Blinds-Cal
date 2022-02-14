//const { response } = require("express");
let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let dbo = require('./database/conn');




var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
//app.use(express.urlencoded());

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

app.get("/email_subscribers", function (request, response){
  let db = dbo.getDB();
  db.collection("email_subscribers").find({}).toArray(function (err, result) {
    console.log(result);
    response.send(result);
  });
})
//Configure express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));

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
  /// response.json(emails);
 emails.push(request.body);
  response.sendStatus(204);
  console.log(request.body);

    // dbo.getDB()
    //   .collection("personal_profile")
    //   .insertOne(request.body);

    // response.sendStatus(204);
});

app.post("/unsubscribe/:email", function(request, response) {
  let email = request.params.email;
  console.log(email);
  let query = {"email": email};
  let db = dbo.getDB();

  db.collection('email_subscribers').deleteMany(query);

  // response.send('Unsubscribed');
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
