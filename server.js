var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('User Connected via Socket.IO!');

	socket.on('message', function (message) {
		console.log('Message Received: ' + now.local().format('h:mm:ss a') +' '+ message.text);

		message.timeStamp = now.valueOf();
		io.emit('message', message);
	});

	socket.emit('message', {
		text: 'Welcome to the Chat Application!',
		timeStamp: now.valueOf()
	});
});

http.listen(PORT, function () {
	console.log('Server Started!');
});