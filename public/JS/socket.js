const socket = io('http://localhost:3000');

socket.on('user-joined', data => {
    console.log("User " + data + " has joined the chat!");
})