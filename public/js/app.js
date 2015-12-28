var socket = io();
var name = getQVar('name') || 'Anonymous';
var room = getQVar('room');

console.log(name + ' wants to join ' + room);

var $roomTitle = jQuery('#room-title');
$roomTitle.text(room);

socket.on('connect', function () {
	console.log('Connected to Socket.IO Server');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('welcome', function (welcome) {
	var momentTimeStamp = moment.utc(welcome.timeStamp);
	console.log(welcome.text);

	$('#welcome').append('<div>'+ welcome.text + '<br><span style="font-size: 0.7em;">' + momentTimeStamp.local().format('MMM. D, YYYY') + '</span></div>')
})

socket.on('message', function (message) {
	var momentTimeStamp = moment.utc(message.timeStamp);
	var $message = jQuery('.messages');

	console.log('New Message:');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' +momentTimeStamp.local().format('h:mm a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');

});

var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});