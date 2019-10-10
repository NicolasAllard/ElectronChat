var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

var users = {};

server.listen(3000);


app.use(express.static(path.join(__dirname, 'public')));

//Redirect the user to the index if he connects to the site
app.get('/', function (req, res) {
    res.redirect("/index.html");
});

//If the user is trying to reach the index, send him the index file
app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

//On user connection
io.on('connection', function (socket) {

    //If the user is new, 
    socket.on('new-user', function (name) {
        var user_exists = false;

        for (var user in users) {
            if (users[user] == name) {
                user_exists = true;
                break;
            }
        }

        if (user_exists == false) {
            if (users[socket.id] == undefined) {
                users[socket.id] = name;
                socket.emit('user-connected-input', name);
                io.emit('user-connected', name);

            } else {
                socket.emit('user-already-logged');
            }
        } else {
            socket.emit('user-exists');
        }

        socket.on('send-message', function (data) {
            io.emit('add-message', data);

        });

    });

    socket.on('disconnect', function () {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
});