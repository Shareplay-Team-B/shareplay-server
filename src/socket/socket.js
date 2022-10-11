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

  io.on('connection', (client) => {
    // console.log('client connected:', client.id);

    client.on('disconnect', () => {
      // console.log('client disconnected:', client.id);
    });

    client.on('test-channel', (data) => {
      // console.log('received socket data from client:', JSON.stringify(data));
      JSON.stringify(data);
    });

    client.on('video-update', (data) => {
      // console.log('received socket data from client:', JSON.stringify(data));
      JSON.stringify(data);
      console.log("sending data: ", data);
      client.broadcast.emit(data);
    });

  });
};

const socket = {
  createServer,
};

export default socket;
