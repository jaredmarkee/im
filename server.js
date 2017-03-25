var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var people = {};

app.get('/', function(req, res, next) {
	res.sendFile(__dirname + '/public/index.html')
});

app.use(express.static('public'));


io.on('connection', function(client) {
	console.log('Client connected...');

	client.on('join', function(data) {
		console.log(data);
	});

	client.on('username', function(name){
		people[client.id] = name;
		console.log("update", name);

	});

	client.on('messages', function(data){
		
		client.emit('thread', people[client.id], data);
		client.broadcast.emit('thread', people[client.id], data);
	});
	
	client.on('deluser', function(user){
		client.emit('del', people[client.id]);
		console.log(user, "has left the server");
	});
	



});

server.listen(7777);
