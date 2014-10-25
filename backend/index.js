var express = require('express');
var app = express();
var http = require('http');
var port = process.env.PORT || 5000
var server = http.createServer(app);
server.listen(port);
var io = require('socket.io')(server);

var sendFileOptions = {
  root: __dirname + '/public/'
}

function qrCode(data) {
  return '<img src="https://api.qrserver.com/v1/create-qr-code/?data=' + data + '&amp;size=100x100;charset=UTF-8" alt="" title="" />'
}

app.use(express.static(__dirname + '/public'));

app.get('/emit/:msg', function(req,res) {
  io.emit('emitted event', req.params.msg);
  res.send('Sent event!');
});

app.get('/qr/:data', function(req,res) {
  res.send(qrCode(req.params.data));
});

app.get('/', function(req,res) {
  res.sendFile('atm.html', sendFileOptions);
});

io.on('connection', function(socket) {
  var id = setInterval(function() {
    socket.send(
      JSON.stringify(new Date()),
      function() {  }
    )
  }, 1000);
  socket.on('close', function() {
    clearInterval(id);
  });
});
