var dgram = require('dgram');
var readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);

var TEAM_IP = '10.1.78.2';

var PORT_IN =  6666;
var PORT_OUT = 6668;

// Server

var server = dgram.createSocket('udp4');

server.on('message', function (msg, rinfo) {
	process.stdout.write(msg.toString());
});

server.bind(PORT_IN);

// Client

var client = dgram.createSocket('udp4');

rl.on('line', function (cmd) {
	if (cmd == '') return; // User is randomly pressing enter.

	var msg = new Buffer(cmd + '\r\n');
	client.send(msg, 0, msg.length, PORT_OUT, TEAM_IP);
});