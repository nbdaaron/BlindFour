var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var C4 = require('./C4');

var currID = 1;

app.get('/', function(req, res){
  res.sendFile(__dirname+'/C4.html');

});

app.get('/test', function(req, res){ 
	res.sendFile(__dirname+'/index.html');

});

app.get('/c4', function(req, res) {
  C4.handle(req, res, io);
  //res.sendFile(__dirname+'/C4.html');
})

app.use(express.static('static'))

  var main = io.of('/main');
  main.on('connection', function(socket){
  var id;
  //console.log("A user connected with ID " + id);
  socket.on('jchat', function() {
    id = currID++;
  });
  socket.on('disconnect', function() {
      console.log("User " + id + " disconnected.");
      main.emit('chat message', "User " + id + " LEFT!!!!!");
    });
    socket.on('chat message', function(msg) {
      if (msg == "fuck") {
        msg = "i love ponies";
      }
      console.log(msg);
      main.emit('chat message', "User " + id + ": " + msg);
    });

});

  var C4IO = io.of('/C4');
  C4IO.on('connection', (socket) => C4.on(socket, C4IO));




var port = process.env.PORT || 3000
http.listen(port, function(){
  console.log('listening on *:' + port);
});