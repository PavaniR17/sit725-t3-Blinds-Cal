const MongoClient = require('mongodb').MongoClient;
//const { MongoClient } = require('mongodb');
                             
const url = "mongodb+srv://admin:admin@cluster0.shxjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";                                                                                                        
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "myFirstDatabase";
                      
 //Example insert function
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "people"
         const col = db.collection("users");
         // Construct a document                                                                                                                                                              
         let blindsObject = {
             "name": { "_ID": "1", "Material": "Aluminium", "Pricing category": "B" }                                                                                                                           

         }
         // Insert a single document
         const p = await col.insertOne(blindsObject);
         // Find the document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}
run().catch(console.dir);