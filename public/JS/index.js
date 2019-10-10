//Index.js
//Author: Nicolas Allard
//Date: 2019-10-08

var user = "";

//Join button
var btnJoin = document.getElementById("btnJoin");
var btnSend = document.getElementById("btnSend");

// input
var txtName = document.getElementById("txtName");
var txtMessage = document.getElementById("txtMessage");

//panels
var pnlChat = document.getElementById("pnlChat");
var pnlAuth = document.getElementById("pnlAuth");

var chatbox = document.getElementById("chatbox");

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

function createChatLine(name, message, ele_class) {
    var chat_line = document.createElement("div");
    chat_line.className = "chatbox-message " + ele_class;

    if (name != undefined && name != "") {
        var user_div = document.createElement("div");
        user_div.className = "user";

        user_div.innerText = name + ":";

        chat_line.appendChild(user_div);
    }

    var message_div = document.createElement("div");
    message_div.className = "message";

    message_div.innerText = message;

    chat_line.appendChild(message_div);

    chatbox.appendChild(chat_line);
}