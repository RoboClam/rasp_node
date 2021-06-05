const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 7777 });

wss.on('connection', function connection(ws, req) {
  let ip = req.headers['x-forwarded-for'];
  console.log(ip);
  if(ip)
  	console.log(ip.split(',')[0].trim());
  ws.on('message', function incoming(data) {
    console.log('received: %s', data);
    wss.clients.forEach(function each(client) { // Relay incoming message to all clients EXCLUDING self
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send({'who' : ip, 'message' : data});
      }
    });
  });

  ws.send('You are now connected to the network! Welcome Aboard.');
});