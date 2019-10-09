const socket = io('http://localhost:3000');

socket.on('user-connected', function(name) {
    //console.log("User " + name + " just connected!");
    login(name);
});

socket.on('user-connected-message', function(name) {
    console.log("User " + name + " just connected!");
});

socket.on('add-message', function(data)
{
    addMessage(data);
});

socket.on('user-exists', function() {
    throw new Error("User Exists");
});

socket.on('user-already-logged', function() {
    throw new Error("User already logged it");
});

socket.on('user-disconnected', function(name) {
    disconnect(name);
})