var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var currID = 1;

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

app.get('/test', function(req, res){ 
	res.sendFile(__dirname+'/test.html');
});

app.use(express.static('static'))

io.on('connection', function(socket){
	var id = currID++;
	console.log("A user connected with ID " + id);
	socket.on('disconnect', function() {
  		console.log("User " + id + " disconnected.");
  		io.emit('chat message', "User " + id + " LEFT!!!!!");
  	});
  	socket.on('chat message', function(msg) {
  		if (msg == "fuck") {
  			msg = "i love ponies";
  		}
  		console.log(msg);
  		io.emit('chat message', "User " + id + ": " + msg);
  	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});