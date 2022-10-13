import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import path from 'path';
import { createNewUser } from '../service/service';

const AuthController = express.Router();
AuthController.use(cors({ origin: '*' }));
AuthController.use(bodyParser.json());
dotenv.config({ path: path.join(__dirname, '..', '.env') });

/**
 * Sign-in endpoint
 */
AuthController.post('/api/v1/auth/sign-in', async (req, res) => {
  // get firebase auth variables
  const email = req?.body?.email;
  const password = req?.body?.password;

  if (!email) {
    res.status(400).json({ message: 'no email provided in request to server' });
  } else if (!password) {
    res.status(400).json({ message: 'no password provided in request to server' });
  } else {
    console.log('success');
  }
});

/**
 * Sign-up endpoint
 */
AuthController.post('/api/v1/auth/sign-up', async (req, res) => {
  const user = req?.body?.username;
  const ema = req?.body?.email;
  const pass = req?.body?.password;
  const cpass = req?.body?.cpassword;

  if (!user) {
    res.status(400).json({ message: 'no username provided in request to server' });
  }

  if (!ema) {
    res.status(400).json({ message: 'no email provided in request to server' });
  }

  if (!pass) {
    res.status(400).json({ message: 'no password provided in request to server' });
  }

  if (!cpass) {
    res.status(400).json({ message: 'no confirm password provided in request to server' });
  }

  if (pass === cpass) {
    admin.auth()
      .createUser({
        email: ema,
        password: pass,
      })
      .then(async () => {
        console.log('Successful in creating user: ', ema);
        await createNewUser(user, ema, pass);
        res.status(200).json({ message: 'Successful in creating user.' });
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  } else {
    res.status(400).json({ message: 'password and confirm password do not match' });
  }
});

export default AuthController;
