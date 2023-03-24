   var express = require('express');
   var MongoClient = require('mongodb').MongoClient;

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const uri = "mongodb+srv://markoni99:passwordGrgeci99@cluster0.enh6fkn.mongodb.net/?retryWrites=true&w=majority";



async function  connectDatabase (uri)
{
  const client = new MongoClient(uri);
  try{
    await client.connect();
    await listDatabases(client);
  }
  catch(e){
    console.error(e);
  }
  finally{
    await client.close();
  }
   return

};


connectDatabase(uri).catch(console.error);

async function createListing(client, newListing)
{
  const result = await client.db("Prodavnica").collection("proizvodi").insertOne(Proizvod);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client)
{
  databasesList = await client.db().admin().listDatabases();
 
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports = router;