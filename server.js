var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function (socket) {
	console.log('User Connected via Socket.IO!');

	socket.on('disconnect', function () {
		var userData = clientInfo[socket.id];
		if (typeof userData !== 'undefined') {
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left!',
				timeStamp: now.valueOf()
			});
			delete userData;
		}
	});

	socket.on('joinRoom', function (req) {
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timeStamp: now.valueOf()
		});
	});

	socket.on('message', function (message) {
		console.log('Message Received: ' + now.local().format('h:mm:ss a') +' '+ message.text);

		message.timeStamp = now.valueOf();
		io.to(clientInfo[socket.id].room).emit('message', message);
	});

	socket.emit('welcome', {
		text: 'Welcome to the Chat Application!',
		timeStamp: now.valueOf()
	});

	socket.emit('message', {
		name: 'System',
		text: '',
		timeStamp: now.valueOf()
	});
});

http.listen(PORT, function () {
	console.log('Server Started!');
});