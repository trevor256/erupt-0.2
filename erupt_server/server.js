// use web sockets to create the connection {npm install ws},
//PORT is equal to number
//server is equal to new server at PORT
let ws = require('ws')
let PORT = 6000
let server = new ws.Server({ port: PORT })

//mongoDB server
const {MongoClient} = require('mongodb');

async function main(){
  const uri = "mongodb+srv://user:pass@erupt.dytny.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // makes a new write
        await createListing(client, {
          name: "test",
          summary: "jerk",
          beds: 12
        })

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createListing(client, newlisting) {
  const result = await client.db("sample").collection("listing")
  .insertOne(newlisting);

  console.log(`new listing: ${result.insertedId}`);
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

               //server connects to godot client//
              //===============//

server.on('connection', server => {
console.log("server running at port", PORT)
//data reseved
  server.on('message', message => {
    let datar = JSON.parse(message);
    console.log(datar, new Date());
});

//data sent
  server.send(JSON.stringify({"server":"connected"}));
});
