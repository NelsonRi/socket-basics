var socket = io();

socket.on('connect', function () {
	console.log('Connected to Socket.IO Server');
});

socket.on('message', function (message) {
	console.log('New Message:');
	console.log(message.text);
});


var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
});