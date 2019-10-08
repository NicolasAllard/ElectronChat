var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

server.listen(3000);
// WARNING: app.listen(80) will NOT work here!

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.redirect("/index.html");
});

app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

io.on('connection', function(socket) {
    //  socket.emit('user-joined', socket.id);
    socket.broadcast.emit('user-joined', socket.id);
});