const net = require('net'),
	nodeCmd = require('node-cmd'),
	notifier = require('node-notifier');

var tiempo = 0;
var ingame = false;
var socket = new net.Socket();

socket.connect(61337, "localhost", function() {
	console.log("Client: Connected to server");
});

socket.on("data", function(data) {
	data = JSON.parse(data);
	if(data.accion == "ejecutar") {
		tiempo = data.tiempo;
		setTimeout(function() {

			}, tiempo - 2000);
		setTimeout(function () {
			nodeCmd.run("taskkill /F /IM " + data.argumentos, function(err, data, start) {
				if(err) throw err;
			})
		}, tiempo)
		nodeCmd.get(data.argumentos, function(err, data,stderr) {
			//console.log("data: ", data);
			socket.write(JSON.stringify({ response: 200}))
			

			socket.end();
		});

	}
	if(data.accion == 'iniciar') {
		startGame('notepad.exe', 10000)
	}

	if(data.accion == 'anadir') {
		addTime(10000);
	}
	//socket.write(JSON.stringify({response: "Hey server"}));
	
})

function startGame(argumento, tiempoe) {
	tiempo = tiempoe;
	ingame = true;
	nodeCmd.get(argumento, function(err, d, s) {

	})
}

function addTime(time) {
	tiempo = tiempo + time;
	notificar('Se añadieron ' + time + ' segundos', 5);
}

function gameSheduler(argumento) {
	if(ingame) {
		setInterval(function() {
			if(time == (60 * 1000)) {
				notificar('Un minuto restante', 'importante');
			}
			setTimeout(function() {
				notificar('1 minuto restante', 2);
				set
			} (60*1000))
		}, 1000)
	}
	else {
		setTimeout(function() {
			gameSheduler(argumento);
		}, 5000)
	}
}

notificar('Un minuto restante', 10);

function notificar(mensaje, tiempo) {
	notifier.notify({
		title: 'VCANO5.COM',
		message: mensaje,
		icon: __dirname + '/imagenes/danger.png',
		sound: true,
		wait: false,
		timeout: tiempo
	})
}