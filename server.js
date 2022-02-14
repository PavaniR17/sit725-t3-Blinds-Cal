let express = require("express");
let app = express();

const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

let http = require('http').createServer(app);
let io = require('socket.io')(http);

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
//const { MongoClient } = require('mongodb');
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//insertBlinds method needs to be hooked up (env.js or app.js)
app.post('/', (req, res) => {
  console.log("New blinds posted")
  console.log('body', req.body)
  let blinds = req.body;
  insertBlinds(blinds, res)
})

// routes
let projectsRoute = require('./routes/index.js')
app.use('/api/projects', projectsRoute)

//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000);

});

http.listen(port, () => {
  console.log("Listening on port ", port);
});

console.log('Server listening on port ' + port)

//Database connection
const uri = "mongodb+srv://admin:admin@cluster0.shxjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(uri, { useNewUrlParser: true }, { useUnifiedTopology: true })

//open connection
const openConnection = (message) => {
  client.connect(err => {
    blindsCollection = client.db("BlindsDatabase").collection("BlindsCollection");
    // perform actions on the collection object

    //client.close();
    if (!err) {
      console.log('Database Connected')
    } else {
      console.log('[error]', err)
    }
  });
}

//insert blinds to db
//insertblinds method here (needs to be hooked up)
const insertBlinds = (blinds, res) => {
  blindsCollection.insertOne(blinds, (err, result) => {
    console.log('Blinds inserted', result)
    //res.send({ result: "form submitted successfully" + blinds })
    res.send({ blinds })
  })
}

/* Section here not necessarily required
//get blinds 
const getBlinds = (res) => {
  blindsCollection.find().toArray(function (err, result) {
    if (err) throw err;
    res.send(result)
  })
}
*/

openConnection()

