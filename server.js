var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

var users = {};

server.listen(3000);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.redirect("/index.html");
});

app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

io.on('connection', function(socket) 
{
    socket.on('new-user', function(name) 
    {

        let user_exists = false;

     for(user in users)
        {
            if(users[user] == name)
            {
                console.log(users);
                user_exists = true;
                break;
            }
        }

        if(user_exists == false)
        {
            if(users[socket.id] == undefined)
            {
                users[socket.id] = name;
                socket.emit('user-connected', name);
                socket.broadcast.emit('user-connected-message', name);

            }
            else
            {
                socket.emit('user-already-logged');
            }
        }
        else
        {
            socket.emit('user-exists');
        }

        socket.on('send-message', function(data){
            socket.emit('add-message', data);
            socket.broadcast.emit('add-message', data);

        });

    });

    socket.on('disconnect', function() {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
});