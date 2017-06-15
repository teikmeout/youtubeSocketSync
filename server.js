
// this is a core example of using socket io with express

// require express and instaciate it
const express = require('express');
const app = express();

// instaciating http server with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8080;
const path = require('path');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});


server.listen(PORT, () => {
  console.log(`server on ${PORT}`);
})

const users = [];

// socket io connection process
// this is what happens when a user connects, a connection event happens
// so we establish a connection listener.
io.on('connection', function (socket) {
  console.log('new user connected: id -> ', socket.id);
  users.push(socket);
  console.log('users connected =', users.length);
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
  socket.on('ready', (data) => {
    console.log('video ready to play');
  });
  socket.on('play', (data) => {
    console.log('playing video somewhere', data);
    socket.broadcast.emit('play', {status: "playing"});
  })
  socket.on('pause', (data) => {
    console.log('video paused somewhere');
    socket.broadcast.emit('pause', {status: "pausing"});
  })

  // this is gonna be the long switch statement
  socket.on('statuschange', (data) => {

  })


  socket.on('disconnect', (data) => {
    users.pop();
    console.log('user disconnected, remaining =', users.length);
  });
});

// DONE var app = require('express')();
// DONE var server = require('http').Server(app);
// DONE var io = require('socket.io')(server);
// DONE server.listen(80);
// DONE app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });
// DONE io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });
