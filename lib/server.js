"use strict";
const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
    httpServer: server
});
const getUniqueID = () => {
    const getRandomNumber = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return getRandomNumber() + getRandomNumber() + '-' + getRandomNumber();
};
const clients = {};
const users = {};
let editorContent = null;
let userActivity = [];
const sendMessage = (json) => {
    Object.keys(clients).map((client) => {
        clients[client].sendUTF(json);
    });
};
const typesDef = {
    USER_JOIN: "userjoin",
    USER_LEFT: "userleft",
    START_COUNT: "startcount"
};
wsServer.on('request', function (request) {
    var userID = getUniqueID();
    console.log(' Recieved a new connection from origin ' + request.origin + '.');
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID);
    connection.on('message', function (message) {
        console.log('msg', message);
        if (message.type === 'utf8') {
            const dataFromClient = JSON.parse(message.utf8Data);
            const json = { type: dataFromClient.type };
            if (dataFromClient.type === typesDef.USER_JOIN) {
                users[userID] = dataFromClient;
                console.log('\n\n\nusers', users);
                userActivity.push(`${dataFromClient.username} joined.`);
                json.data = { users, userActivity };
            }
            else if (dataFromClient.type === typesDef.START_COUNT) {
                countValue = dataFromClient.content;
                json.data = { countValue, userActivity };
            }
            sendMessage(JSON.stringify(json));
        }
    });
    connection.on('close', function (connection) {
        console.log(userID + "disconnected.", users[userID]);
        const json = { type: typesDef.LEFT };
        userActivity.push(`${users[userID].username} left.`);
        json.data = { users, userActivity };
        delete clients[userID];
        delete users[userID];
        sendMessage(JSON.stringify(json));
    });
});
//# sourceMappingURL=server.js.map