var socket = io();
var name = getQVar('name');
var room = getQVar('room');

console.log(name + ' wants to join ' + room);

socket.on('connect', function () {
	console.log('Connected to Socket.IO Server');
});

socket.on('welcome', function (welcome) {
	var momentTimeStamp = moment.utc(welcome.timeStamp);
	console.log(welcome.text);

	$('#welcome').append('<div>'+ welcome.text + '<br><span style="font-size: 0.7em;">' + momentTimeStamp.local().format('MMM. D, YYYY') + '</span></div>')
})

socket.on('message', function (message) {
	var momentTimeStamp = moment.utc(message.timeStamp);
	console.log('New Message:');
	console.log(message.text);

	$('.messages').append('<p><strong>' + momentTimeStamp.local().format('h:mm a') + ': </strong>' + message.text + '</p>')
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