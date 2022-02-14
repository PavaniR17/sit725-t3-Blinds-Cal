const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://mongodb:ZQzJT1yUoEKWs4tX@cluster0.qpxcp.mongodb.net/blinds?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

module.exports = {
  connect: (callback) => {  
    client.connect((err, db) => {
      if (err || !db) 
        return callback (err);

      dbConnection = db.db("blinds");

      console.log("Connected to MongoDB Atlas");

      callback();

    })
  },

  getDB : () => {
      return dbConnection;
  }
}