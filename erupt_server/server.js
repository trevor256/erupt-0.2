// use web sockets to create the connection {npm install ws},
//PORT is equal to number
//server is equal to new server at PORT
let ws = require('ws')
let PORT = 6000
let server = new ws.Server({ port: PORT })


               //server connects//
              //===============////

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
