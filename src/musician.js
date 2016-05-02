/*global require */


var map = ["piano", "ti-ta-ti", "trumpet", "pouet", "flute", "trulu", "violin", "gzi-gzi", "drum", "boum-boum"];

var dgram = require('dgram');

var socket = dgram.createSocket('udp4');

process.on('SIGINT', function(){
	process.exit();
});

function Musician(instrument) {
	
	this.instrument = instrument;

	Musician.prototype.update = function (){
	
		console.log("I am about to play my : " + instrument);
		for (var i=0; i<map.length; i++) {
			if (instrument === map[i]) {
				this.sound = map[i+1];
				console.log(map[i+1]);
			}
		}
		
		var data = {
		
			sound: this.sound
		
		};
		var payload = JSON.stringify(data);
		
		
		message = new Buffer(payload);
		socket.send(message, 0, message.length, 9292, "254.232.232.54");
	
	}
	
	
	setInterval(this.update.bind(this), 1000);
}
var instrument = process.argv[2];

console.log("\nPlaying my instrument");
var mus1 = new Musician(instrument);