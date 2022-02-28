// mongodb driver npm install mongodb
const {MongoClient} = require('mongodb');

//==mongoDB server==//
async function main(){
const uri = "mongodb+srv://trevor256:password1234@erupt.dytny.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

try {
// Connect to the MongoDB cluster
await client.connect();

// makes a new login
await createLogin(client, {
  username: "test",
  password: "jerk123"
})

// makes a new user data
await createUdata(client, {
  username: "test",
  data: 3452345134
})

// check for error then close
} catch (e) {
console.error(e);
} finally {
await client.close();
}
}

main().catch(console.error);

//store user login
async function createLogin(client, newlogin) {
const result = await client.db("users").collection("login")
.insertOne(newlogin);
console.log(`new account: ${result.insertedId}`);
}

//store user data
async function createUdata(client, newdata) {
const result = await client.db("users").collection("data")
.insertOne(newdata);
console.log(`new Udata: ${result.insertedId}`);
}
