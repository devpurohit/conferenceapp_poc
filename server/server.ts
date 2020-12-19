import * as http from 'http';
import APP_CONST from './constants';
import { server  as webSocketServer, IMessage} from 'websocket';
import ConnectionContainer from './interfaces/connection-container';
import SocketResponse from './interfaces/socket-response';



// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(APP_CONST.webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

// Generates unique ID for every new connection
const getUniqueID = (): string => {
  const getRandomNumber = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return getRandomNumber() + getRandomNumber() + '-' + getRandomNumber();
};

const clients: ConnectionContainer = {};
const users: ConnectionContainer = {};

// User activity history.
const userActivity: string[] = [];


const sendMessage = (json: string) => {
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
}
 

wsServer.on('request', function(request) {
  var userID = getUniqueID();
  console.log(' Recieved a new connection from origin ' + request.origin + '.');
  const connection = request.accept(undefined, request.origin);

  
  clients[userID] = connection;
  console.log('connected: ' + userID);

  connection.on('message', function(message : IMessage) {
    if (message.type === 'utf8') {
      const dataFromClient = JSON.parse(message.utf8Data as string);
      const json: SocketResponse = { type: dataFromClient.type };

      if (dataFromClient.type === APP_CONST.typesDef.USER_JOIN) {
        users[userID] = dataFromClient;
        userActivity.push(`${dataFromClient.username} joined.`);
        json.data = { users, userActivity };
      } else if (dataFromClient.type === APP_CONST.typesDef.START_COUNT) {
        console.log(dataFromClient.content)
        const countValue = dataFromClient.content;
        json.data = { countValue, userActivity };
      }
      sendMessage(JSON.stringify(json));
    }
  });

  connection.on('close', function(connection) {
    const json: SocketResponse = { type: APP_CONST.typesDef.USER_LEFT };
    userActivity.push(`${users[userID]} left.`);
    json.data = { users, userActivity };
    delete clients[userID];
    delete users[userID];
    
    sendMessage(JSON.stringify(json));
  });
});
