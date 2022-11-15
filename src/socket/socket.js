import { Server } from 'socket.io';

/**
 * Create a web socket server clients can connect to
 * @param {object} httpServer http server to attach socket server to
 */
const createServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connect', (client) => {
    console.log('client connected:', client.id);

    client.on('disconnect', () => {
      console.log('client disconnected:', client.id);
    });

    client.on('test-channel', (data) => {
      console.log('received socket data from client:', JSON.stringify(data));
    });

    client.on('video-update', (data) => {
      // console.log('sending data: ', data);
      client.broadcast.emit('video-update-client', data);
    });

    client.on('text-session', (data) => {
      console.log(data.state);
      client.to(data.code).emit('text-session-client', data.state);
    });

    client.on('join-session', (data) => {
      client.join(data);
      console.log('Joined room: ', data);
    });
  });
};

const socket = {
  createServer,
};

export default socket;
