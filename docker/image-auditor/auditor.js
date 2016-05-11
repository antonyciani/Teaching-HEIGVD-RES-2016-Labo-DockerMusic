// Authors: CIANI Antony, HERNANDEZ Thomas

var dgram = require('dgram');
var net = require('net');
var HashMap = require('hashmap');

var UDP_PORT = 9292;
var TCP_PORT = 2205;
var MULTICAST_ADDRESS = "224.0.0.250";

var EMISSION_INTERVAL = 1000;

var soundMap = new HashMap();
soundMap.set("ti-ta-ti","piano");
soundMap.set("pouet","trumpet");
soundMap.set("trulu","flute");
soundMap.set("gzi-gzi","violin");
soundMap.set("boum-boum", "drum");

var activeMusiciansMap = new HashMap();

process.on('SIGINT', function(){
	process.exit();
});


// UDP Server
var s = dgram.createSocket('udp4');
s.bind(UDP_PORT, function() {
	console.log("UDP Server listening on port " + UDP_PORT);
	s.addMembership(MULTICAST_ADDRESS);
});

s.on('message', function(msg, source) {
	console.log("Data has arrived: " + msg + ". Source port: " + source.port);
	
	var musicianData = JSON.parse(msg);
	var musician = {}; 
	
	musician.uuid = musicianData.uuid;
	musician.instrument = soundMap.get(musicianData.sound);
	var newUuid = musicianData.uuid;
	console.log("UUID = " + newUuid);
	var newSound = musicianData.sound;
	console.log("Sound = " + newSound);
	var timeStamp = new Date();
	musician.activeSince = timeStamp;
	
	activeMusiciansMap.set(musician.uuid, musician);
	activeMusiciansMap.forEach(function(value, key) {
		console.log(key + " : " + JSON.stringify(value));
	});
	
	
});


// TCP Server
var server = net.createServer((client) => {
		
	var activeMusicians = [];	
	activeMusiciansMap.forEach(function(value, key) {
		if((Date.now() - value.activeSince.getTime()) < (5 * EMISSION_INTERVAL)){
			activeMusicians.push(value);
		}
		else{
			activeMusiciansMap.remove(key);
		}
			
	});
	
	var payload = JSON.stringify(activeMusicians, null, 2);
	
	client.write(payload);
	client.end();

});
server.on('error', (err) => {
	throw err;
});
server.listen(TCP_PORT, () => {
	console.log('TCP Server listening on port ' + TCP_PORT);
});
	




