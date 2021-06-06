const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 7777 });

wss.on('connection', function connection(ws, req) {
  console.log("New Connection...");
  ws.on('message', function incoming(incoming) {
    let parsed = JSON.parse(incoming);

    if (parsed.type === 'CHAT') {
      let data = parsed.message;
      let who = parsed.who.trim() !== "" ? parsed.who.trim() : "unknown";
      console.log('%s says: %s', who, data);
      wss.clients.forEach(function each(client) { // Relay incoming message to all clients 
        if (client !== ws && client.readyState === WebSocket.OPEN) { // EXCLUDING self
          let packet = JSON.stringify({ 'who': who, 'message': data });
          client.send(packet);
        }
      });
    }

    if (parsed.type === 'UNITY') {
      let who = parsed.who.trim() !== "" ? parsed.who.trim() : "unknown";
      console.log("Unity scene updates..." + parsed);
      
    }

  });

  ws.send('You are now connected to the network! Welcome Aboard.');


  let xx, yy, zz = 0;
  setInterval(() => {
    let unityPacket = JSON.stringify({'who': 'someone', 'xx' : xx++, 'yy' : yy++, 'zz' : zz++});
    ws.send(unityPacket);
  }, 1700);
});