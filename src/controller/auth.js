import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import createNewUser from '../service/service';

const AuthController = express.Router();
AuthController.use(cors({ origin: '*' }));
AuthController.use(bodyParser.json());

/**
 * Sign-in endpoint
 */
AuthController.post('/api/v1/auth/sign-in', async (req, res) => {
  const email = req?.body?.email;
  const password = req?.body?.password;

  if (!email) {
    res.status(400).json({ message: 'no email provided in request to server' });
  } else if (!password) {
    res.status(400).json({ message: 'no password provided in request to server' });
  } else {
    console.log('Add auth here');
  }

  // TODO: implement sign-in endpoint
  console.log('credentials received: ', email, password);

  res.status(400).json({ message: 'invalid email or password' });
});

/**
 * Sign-up endpoint
 */
AuthController.post('/api/v1/auth/sign-up', async (req, res) => {
  const username = req?.body?.username;
  const email = req?.body?.email;
  const password = req?.body?.password;
  const cpassword = req?.body?.cpassword;

  if (!username) {
    res.status(400).json({ message: 'no username provided in request to server' });
  }

  if (!email) {
    res.status(400).json({ message: 'no email provided in request to server' });
  }

  if (!password) {
    res.status(400).json({ message: 'no password provided in request to server' });
  }

  if (!cpassword) {
    res.status(400).json({ message: 'no confirm password provided in request to server' });
  }

  if (password === cpassword) {
    console.log('Worked');
  } else {
    res.status(400).json({ message: 'password and confirm password do not match' });
  }
  createNewUser(username, email, password);
});

export default AuthController;
