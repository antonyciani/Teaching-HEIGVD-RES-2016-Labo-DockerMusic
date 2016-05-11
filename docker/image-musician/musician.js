// Authors: CIANI Antony, HERNANDEZ Thomas

var dgram = require('dgram');
var uuid = require('uuid');
var HashMap = require('hashmap');


var instrumentMap = new HashMap();
instrumentMap.set("piano", "ti-ta-ti");
instrumentMap.set("trumpet", "pouet");
instrumentMap.set("flute", "trulu");
instrumentMap.set("violin", "gzi-gzi");
instrumentMap.set("drum", "boum-boum");

var UDP_PORT = 9292;
var MULTICAST_ADDRESS = "224.0.0.250";

var EMISSION_INTERVAL = 1000;

process.on('SIGINT', function(){
	process.exit();
});

var socket = dgram.createSocket('udp4');

function Musician(instrument) {
	
	this.instrument = instrument;
	
	this.sound = instrumentMap.get(instrument);
	
	this.uuid = uuid.v4();
	console.log(this.uuid);

	Musician.prototype.update = function (){
		
		console.log("I am about to play my : " + this.instrument);
		var data = {
			uuid : this.uuid,
			sound: this.sound
		};
		var payload = JSON.stringify(data);
		
		message = new Buffer(payload);
		socket.send(message, 0, message.length, UDP_PORT, MULTICAST_ADDRESS);
	
	}
	
	setInterval(this.update.bind(this), EMISSION_INTERVAL);
}

var instrument = process.argv[2];

console.log("\nPlaying my instrument");
var mus1 = new Musician(instrument);