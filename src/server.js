import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import * as admin from 'firebase-admin';
import socket from './socket/socket';
import AuthController from './controller/auth';

dotenv.config({ path: path.join(__dirname, '..', '.env') });
// create express application
const app = express();

if (!process.env.DB_PASS) {
  console.error('DB_PASS environment variable not defined');
  process.exit(1);
}

if (!process.env.FIREBASE_ADMIN_SDK) {
  console.error('FIREBASE_ADMIN_SDK environment variable not defined');
  process.exit(1);
}

const adminSdkCredentials = JSON.parse(process.env.FIREBASE_ADMIN_SDK);
adminSdkCredentials.private_key = adminSdkCredentials.private_key.replace(/\\n/g, '\n');
admin.initializeApp(adminSdkCredentials);

// routes
app.use(AuthController);
// create web socket server
const server = app.listen(process.env.port || 8080);
socket.createServer(server);
console.log(`App listening on port ${server.address().port}`);
