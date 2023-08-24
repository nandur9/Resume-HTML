const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
  res.end('WebSocket server is running');
});

const wss = new WebSocket.Server({ server });

const onlineUsers = [];

wss.on('connection', (ws) => {
  // A new user has connected
  const username = generateRandomUsername(); // You can implement this function
  onlineUsers.push({ id: ws._socket.remoteAddress, username });

  // Send the updated list of online users to all connected clients
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(onlineUsers));
    }
  });

  ws.on('close', () => {
    // A user has disconnected
    const index = onlineUsers.findIndex(user => user.id === ws._socket.remoteAddress);
    if (index !== -1) {
      onlineUsers.splice(index, 1);
    }

    // Send the updated list of online users to all connected clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(onlineUsers));
      }
    });
  });
});

server.listen(3000, () => {
  console.log('WebSocket server is listening on port 3000');
});
