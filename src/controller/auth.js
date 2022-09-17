import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const AuthController = express.Router();
AuthController.use(cors({ origin: '*' }));
AuthController.use(bodyParser.json());

/**
 * Sign-in endpoint
 */
AuthController.post('/api/v1/auth/sign-in', (req, res) => {
  const username = req?.body?.username;
  const password = req?.body?.password;

  if (!username) {
    res.status(400).json({ message: 'no username provided in request to server' });
    return;
  }

  if (!password) {
    res.status(400).json({ message: 'no password provided in request to server' });
    return;
  }

  // TODO: implement sign-in endpoint
  console.log('credentials received: ', username, password);

  res.status(400).json({ message: 'invalid username or password' });
});

export default AuthController;
