var dgram = require('dgram');
var readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);

var TEAM_IP = '10.1.78.2';

var PORT_IN =  6666;
var PORT_OUT = 6668;

rl.setPrompt('$ ');

// Server

var server = dgram.createSocket('udp4');

server.on('message', function (msg, rinfo) {
	var msg = msg.slice(0, msg.length -2); // Truncate CRLF
	console.log( '[cRIO] ' + msg);

	rl.prompt();
});

server.on("listening", function () {
	rl.prompt();
});

server.bind(PORT_IN);

// Client

var client = dgram.createSocket('udp4');

rl.on('line', function (cmd) {
	if (cmd == '') {
		// User is randomly pressing enter.
		rl.prompt();
		return;
	}

	var msg = new Buffer(cmd + '\r\n');
	client.send(msg, 0, msg.length, PORT_OUT, TEAM_IP);
});