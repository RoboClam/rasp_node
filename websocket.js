const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 7777 });

wss.on('connection', function connection(ws, req) {
  ws.on('message', function incoming(incoming) {
	let parsed = JSON.parse(incoming);
	let data = parsed.message;
	let who = parsed.who.trim() !== "" ? parsed.who.trim() : "unknown";
	console.log('%s says: %s', who, data);
    wss.clients.forEach(function each(client) { // Relay incoming message to all clients EXCLUDING self
      if (client !== ws && client.readyState === WebSocket.OPEN) {
		  let packet = JSON.stringify({'who' : who, 'message' : data});
        client.send(packet);
      }
    });
  });

  ws.send('You are now connected to the network! Welcome Aboard.');
});