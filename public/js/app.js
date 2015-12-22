var socket = io();

socket.on('connect', function () {
	console.log('Connected to Socket.IO Server');
});

socket.on('message', function (message) {
	var momentTimeStamp = moment.utc(message.timeStamp);
	console.log('New Message:');
	console.log(message.text);

	$('.messages').append('<p><strong>' + momentTimeStamp.local().format('MMM D YYYY, h:mm a') + ': </strong>' + message.text + '</p>')
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