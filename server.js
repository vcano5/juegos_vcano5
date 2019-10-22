const express = require('express'),
	app = express(),
	nodeCmd = require('node-cmd'),
	ejs = require('ejs'),
	fs = require('fs'),
	net = require('net'),
	mysql = require('mysql');

var juegos;

app.listen(80);

app.set('view engine', 'ejs')

app.get('/notepad', function(req, res) {
	nodeCmd.get('notepad.exe', function() {
		var d = new Date();
		res.send(d)
	});
	//res.send(200);
})

app.get('/jugar', function(req, res) {
	if(req.query.juego != undefined) {
		ejecutar(req.query.juego, req.query.maquina)
	}
})

app.get('/', function(req, res) {
	console.log(juegos[0])
	console.log(juegos.length)

	res.render('pages/index', {"tamaño": juegos.length, "juegos": juegos})

})

app.route('/juegos')
	.get(function(req, res) {
		res.send(juegos)
	})


function loadGameList() {
	fs.readFile('juegos.json', 'utf8', function(err, data) {
		if(err) throw err;
		juegos = JSON.parse(data);
	})
}

loadGameList();


function openGame(device) {

}


app.get('/login', function(req, res) {
	res.render('pages/login')
})

var server = net.createServer(function(conn) {
	console.log("Server: Client connected");
	conn.on("end", function() {
		console.log("Server: Client disconnected");
	})
	conn.on("data", function(data) {
		data = JSON.parse(data);
		console.log("Response from client: %s", data.response);
	})

	conn.write(
		JSON.stringify( {
			argumentos: "notepad.exe",
			//argumentos: "C:\\Users\\vcano5\\Desktop\\ktane.exe",
			accion: "ejecutar",
			tiempo: (60*1000)
		}))
	setTimeout(function() {
		conn.write(JSON.stringify( {
			argumentos: 'notepad.exe',
			accion: 'anadir', 
			tiempo: (10*1000)
		}))
	}, 15000)
})


server.listen(61337, "localhost", function() {
	console.log("Client: Connected to server")
})

/*
app.get('/login', function(req, res) {
	if(req.query.id == undefined) {
		res.sendStatus(405);
	}
	else {
		res.render('pages/login');
	}
})
*/

app.route('/login')
	.get(function(req, res) {
		if(req.query.id == undefined) {
			res.sendStatus(405);
		}
		else {
			res.render('pages/login');
		}
	})
	.post(function(req, res) {

	})