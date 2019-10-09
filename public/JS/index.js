//Index.js
//Author: Nicolas Allard
//Date: 2019-10-08

let user = "";

//Join button
let btnJoin = document.getElementById("btnJoin");
let btnSend = document.getElementById("btnSend");

// input
let txtName = document.getElementById("txtName");
let txtMessage = document.getElementById("txtMessage");

//panels
let pnlChat = document.getElementById("pnlChat");
let pnlAuth = document.getElementById("pnlAuth");

let chatbox = document.getElementById("chatbox");

//Join event
btnJoin.addEventListener("click", function() {
    socket.emit('new-user', txtName.value);

});

btnSend.addEventListener("click", function() {
    if (txtMessage.value != undefined && txtMessage.value != "") {
        socket.emit('send-message', {
            user: user,
            message: txtMessage.value
        });
        txtMessage.value = "";
    }
});

//Open the chat
function login(username) {
    user = username;
    pnlAuth.style.display = "none";
    pnlChat.style.display = "block";
}

//Add a message to the chatbox
function addMessage(data) {
    let chat_line = document.createElement("div");
    chat_line.className = "chatbox-message";

    let user_div = document.createElement("div");
    user_div.className = "user";

    user_div.innerText = data.user + ":";

    let message_div = document.createElement("div");
    message_div.className = "message";

    message_div.innerText = data.message;

    chat_line.appendChild(user_div);
    chat_line.appendChild(message_div);

    chatbox.appendChild(chat_line);
}

function disconnect(name) {
    let chat_line = document.createElement("div");
    chat_line.className = "chatbox-message logout";

    let message_div = document.createElement("div");
    message_div.className = "message";

    message_div.innerText = name + " has logged out.";

    chat_line.appendChild(message_div);

    chatbox.appendChild(chat_line);
}

function connect(name) {
    let chat_line = document.createElement('div');
    chat_line.className = "chatbox-message login";

    let message_div = document.createElement("div");
    message_div.className = "message";

    message_div.innerText = name + " has logged in.";

    chat_line.appendChild(message_div);

    chatbox.appendChild(chat_line);
}