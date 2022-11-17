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
      io.in(data.code).emit('video-update-client', { action: data.action, time: data.time });
    });

    client.on('text-session', (data) => {
      io.in(data.code).emit('text-session-client', { message: data.state, sender: data.name });
    });

    client.on('join-session', (data) => {
      client.join(data);
      io.in(data).emit('text-session-client', { message: 'user joined', sender: 'computer' });
      console.log('Joined room: ', data);
    });

    client.on('leave-session', (data) => {
      client.leave(data);
      io.in(data).emit('text-session-client', { message: 'user left', sender: 'computer' });
      console.log('Left room: ', data);
    });
  });
};

const socket = {
  createServer,
};

export default socket;
