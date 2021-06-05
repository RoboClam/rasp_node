const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 7777 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    console.log('received: %s', data);
    wss.clients.forEach(function each(client) { // Relay incoming message to all clients EXCLUDING self
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.send('You are now connected to the network! Welcome Aboard.');
});