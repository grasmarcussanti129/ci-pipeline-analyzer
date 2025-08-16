const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.send('<h1>CI Pipeline Analyzer</h1>');
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Emit some sample data
  setInterval(() => {
    const data = { builds: Math.floor(Math.random() * 100), success: Math.random() > 0.5 };
    socket.emit('pipelineMetrics', data);
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
