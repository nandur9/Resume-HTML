// Create a WebSocket connection
const socket = new WebSocket('https://www.linkedin.com/in/mr-kumar-reddy-133718261/'); // Update with your server address

// When a message is received from the server
socket.addEventListener('message', (event) => {
  const onlineUsers = JSON.parse(event.data);
  updateOnlineUsersList(onlineUsers);
});

// Update the online users list
function updateOnlineUsersList(users) {
  const onlineUsersList = document.getElementById('onlineUsersList');
  onlineUsersList.innerHTML = '';

  users.forEach(user => {
    const userItem = document.createElement('li');
    userItem.textContent = user.username;
    onlineUsersList.appendChild(userItem);
  });
}
