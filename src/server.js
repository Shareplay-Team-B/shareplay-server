import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import * as admin from 'firebase-admin';
import socket from './socket/socket';
import AuthController from './controller/auth';

dotenv.config({ path: path.join(__dirname, '..', '.env') });
// create express application
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

// routes
app.use(AuthController);
// create web socket server
const server = app.listen(process.env.port || 8080);
socket.createServer(server);
console.log(`App listening on port ${server.address().port}`);
