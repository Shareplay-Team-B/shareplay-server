import express from 'express';
import socket from './socket/socket';
import AuthController from './controller/auth';

// create express application
const app = express();

// routes
app.use(AuthController);

// create web socket server
const server = app.listen(process.env.port || 8080);
socket.createServer(server);
console.log(`App listening on port ${server.address().port}`);
