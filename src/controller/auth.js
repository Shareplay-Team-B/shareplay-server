import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import path from 'path';
import { createNewUser, getAllUsers } from '../service/service';

const AuthController = express.Router();
AuthController.use(cors({ origin: '*' }));
AuthController.use(bodyParser.json());
dotenv.config({ path: path.join(__dirname, '..', '.env') });

/**
 * Sign-in endpoint
 */
AuthController.post('/api/v1/auth/sign-in', async (req, res) => {
  const email = req?.body?.email;
  const password = req?.body?.password;

  if (!email) {
    res.status(400).json({ message: 'No email provided!' });
    return;
  }

  if (!password) {
    res.status(400).json({ message: 'No password provided!' });
    // eslint-disable-next-line no-useless-return
    return;
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
  const avalUser = await getAllUsers(user);

  if (!ema) {
    res.status(400).json({ message: 'No email provided!' });
    return;
  }

  if (!user) {
    res.status(400).json({ message: 'No username provided!' });
    return;
  }

  if (!pass) {
    res.status(400).json({ message: 'No password provided!' });
    return;
  }

  if (!cpass) {
    res.status(400).json({ message: 'No confirm password provided!' });
    return;
  }

  if (!avalUser) {
    res.status(400).json({ message: 'Username is not available!' });
    return;
  }

  if (pass !== cpass) {
    res.status(400).json({ message: 'Passwords do not match!' });
    return;
  }

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
      res.status(400).json({ message: error.errorInfo.message });
    });
});

export default AuthController;
