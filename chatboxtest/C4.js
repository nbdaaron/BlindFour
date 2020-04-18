var index = require('./index');
var express = require('express');
var app = express();
var http = require('http').Server(app);

module.exports = {

	handle: function(req, res, io) {
		res.sendFile(__dirname+'/C4_online.html');
	},

	on: function(socket, io){
		socket.on('play', (msg) => play(msg, io));
		socket.on('disconnect', (msg) => disconnected(msg, io));
		socket.on('requestReset', (msg) => reset(msg, io));
	}

};

	function reset(msg, io) {
		console.log("Reset");
		io.emit('reset');
	}

	function play(msg, io) {
		console.log("Played " + msg);
		io.emit('played', msg);
	}

	function received(msg, io) {
		console.log(msg);
	}

	function disconnected(msg) {
		console.log("User disconnected");
	}