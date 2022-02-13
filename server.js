var express = require('express');
var app = express();

app.listen(5050, function() {
    console.log('Listening on port 5050');
});

//Change the './' to point to the root of your angular app
//app.use(express.static(path.resolve('./public')));
app.use(express.static('public'));

//Send everything to your index.html page
app.get('/*', function(req, res) {
  res.sendFile(path.resolve('./index.html'));
 });
