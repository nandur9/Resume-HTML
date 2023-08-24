const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const onlineUsers = new Set(); // Store online users

server.on('connection', (socket) => {
  // Add user to the list of online users
  onlineUsers.add(socket);

  // Send updated online users list to all connected clients
  sendOnlineUsersToAllClients();

  socket.on('close', () => {
    // Remove user from the list of online users
    onlineUsers.delete(socket);

    // Send updated online users list to all connected clients
    sendOnlineUsersToAllClients();
  });
});

function sendOnlineUsersToAllClients() {
  const onlineUsernames = Array.from(onlineUsers).map(socket => socket.username);
  const data = JSON.stringify(onlineUsernames);

  // Send the updated list of online users to all connected clients
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}
