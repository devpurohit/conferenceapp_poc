"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const constants_1 = require("./constants");
const websocket_1 = require("websocket");
const server = http.createServer();
server.listen(constants_1.default.webSocketsServerPort);
const wsServer = new websocket_1.server({
    httpServer: server
});
const getUniqueID = () => {
    const getRandomNumber = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return getRandomNumber() + getRandomNumber() + '-' + getRandomNumber();
};
const clients = {};
const users = {};
const userActivity = [];
const sendMessage = (json) => {
    Object.keys(clients).map((client) => {
        clients[client].sendUTF(json);
    });
};
wsServer.on('request', function (request) {
    var userID = getUniqueID();
    console.log(' Recieved a new connection from origin ' + request.origin + '.');
    const connection = request.accept(undefined, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID);
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            const dataFromClient = JSON.parse(message.utf8Data);
            const json = { type: dataFromClient.type };
            if (dataFromClient.type === constants_1.default.typesDef.USER_JOIN) {
                users[userID] = dataFromClient;
                userActivity.push(`${dataFromClient.username} joined.`);
                json.data = { users, userActivity };
            }
            else if (dataFromClient.type === constants_1.default.typesDef.START_COUNT) {
                console.log(dataFromClient.content);
                const countValue = dataFromClient.content;
                json.data = { countValue, userActivity };
            }
            sendMessage(JSON.stringify(json));
        }
    });
    connection.on('close', function (connection) {
        const json = { type: constants_1.default.typesDef.USER_LEFT };
        userActivity.push(`${users[userID]} left.`);
        json.data = { users, userActivity };
        delete clients[userID];
        delete users[userID];
        sendMessage(JSON.stringify(json));
    });
});
//# sourceMappingURL=server.js.map