// use web sockets to create the connection {npm install ws},
//server is equal to new server at PORT

const ws = require('ws')
let PORT = 6000
let server = new ws.Server({ port: PORT })



        //==Godot server==//
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
