// Simple Node.js + Socket.io chat server
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (your index.html and assets)
app.use(express.static(path.join(__dirname, 'create-react-app')));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    // Broadcast message to all clients, including name
    io.emit('chat message', {
      text: msg.text,
      name: msg.name || 'Anonymous',
      time: new Date().toLocaleTimeString()
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
