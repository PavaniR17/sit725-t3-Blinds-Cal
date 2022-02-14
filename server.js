let express = require('express');
let app = express();

let http = require('http').createServer(app);
let io = require('socket.io')(http);
let path = require('path')
const mongoose = require('mongoose')
const mongoURL = 'mongodb+srv://praavi:Sripa2709@cluster0.cnrl8.mongodb.net/Blinds-Calc?retryWrites=true&w=majority'

app.listen(5050, function() {
   console.log('Listening on port 5050');
});
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Connection to mongodb Atlas is successful'))
  .catch(err => console.log(err));

// Blinds-Calc.sit725-group
//Change the './' to point to the root of your angular app
//app.use(express.static(path.resolve('./public')));
//app.use(express.static('/sit725-t3-Blinds-Cal'));


//app.use(express.static('../build'));
const sit725_collection = mongoose.model('Blinds-Calc', 
               new mongoose.Schema({ url: String, text: String, id: Number}), 
               'sit725-group')

app.use('/', express.static(path.join(__dirname,'sit725-t3-Blinds-Cal')));
app.get('/api', async(req, res) => {
  try {
    const ranges = await sit725_collection.find({});
    res.status(200)
      .json(ranges)
  } catch (error) {
    res.status(500)
      .json({
        status:'Fail',
        message: error,
      })
  }
})


//app.get('*', (req, res)=> {
 // const index = path.join(__dirname, '/', '../build', 'index.html' );
  //res.sendFile(index);
//});

//console.log(process.env.name)

//Send everything to your index.html page
//app.get('/*', function(req, res) {
 // res.sendFile(path.resolve('./index.html'));
 //});

 

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

 

