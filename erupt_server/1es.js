let http = require('http');
let fs = require('fs');
let path = require('path');

let ws = require('ws')
let PORT = 6000
let server = new ws.Server({ port: PORT })

const {MongoClient} = require('mongodb');

http.createServer(function (request, response) {
    console.log('request ', request.url);

    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './Erupt.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8080);




// use web sockets to create the connection {npm install ws},
//server is equal to new server at PORT


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
