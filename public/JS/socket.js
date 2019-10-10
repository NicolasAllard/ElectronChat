const socket = io('http://localhost:3000');

//Open the chat panel for the user
socket.on('user-connected-input', function(name) {
    login(name);
});

//Send a message from a user to the chat room
socket.on('add-message', function(data) {
    createChatLine(data.user, data.message, "");
});

//Send a message for everybody announcing the new user
socket.on('user-connected', function(name) {
    createChatLine("", name + " has logged in.", "login");
});

//Send a message for everybody announcing the user who disconnected
socket.on('user-disconnected', function(name) {
    createChatLine("", name + " has logged out.", "logout");
});


//Errors
socket.on('user-exists', function() {
    throw new Error("User Exists");
});

socket.on('user-already-logged', function() {
    throw new Error("User already logged it");
});