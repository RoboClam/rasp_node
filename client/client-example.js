var l = document.getElementById('chat_log');
var appendMessage = function (m) {
	console.log(m);
	if(m.who) {
		console.log(m.who);
	}
	var i = document.createElement('li');
	try {
		
		var parsed = JSON.parse(m);
	} catch( e ) {
		console.log(e);
		var parsed = {'who': 'System', 'message': m};
	}
	i.innerText = `${parsed.who}: ${parsed.message}`;
	l.appendChild(i);
}
// log('opening websocket connection');
var s = new WebSocket('ws://raspberrypi');
s.addEventListener('error', function (m) { console.log("error"); console.log(m)});
s.addEventListener('open', function (m) { console.log("websocket connection open"); });
s.addEventListener('message', function (m) { appendMessage(m.data); });


var send = function (input) {
	let name = document.getElementById("chat_name").value;
	let packet = JSON.stringify({"who": name, "message": input});
	this.appendMessage(JSON.stringify({"who": "Me", "message": input}));
	s.send(packet);
}