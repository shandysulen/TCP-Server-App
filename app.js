const net = require('net');
var colors = require('colors');

var server = net.createServer();

var port = 9000;

/* TCP connection - different from HTTP request/response model */
server.on("connection", (socket) => {
    var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
    console.log("New client connection has been made at %s".green, remoteAddress);

    socket.on("data", (data) => {
        console.log("Data from %s: %s".cyan, remoteAddress, data);
        socket.write("Thanks!");
    });

    socket.once("close", () => {
        console.log("Connection with %s closed".yellow, remoteAddress);
    });

    socket.on("error", () => {
        console.log("Connection error with %s".red, remoteAddress);
    });

});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log('Address in use, restarting server...'.yellow);
    setTimeout( () => {
      server.close();
      port++;
      server.listen(port);
    }, 1000);
  }
});

server.listen(port, () => {
    console.log("Server listening on %j".green, server.address().port);
});
