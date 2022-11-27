import { Server } from 'socket.io';

const roomHosts = {};

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
      if (roomHosts[data.code] === client.id) {
        console.log(client.id, ' is a host sending data ', data);
        // io.in(data.code).emit('video-update-client', { action: data.action, time: data.time });
        client.broadcast.to(data.code).emit('video-update-client', { action: data.action, time: data.time });
      } else {
        console.log('not emitting state change to ', data.code, ' cuz ', client.id, ' is not host');
      }
    });

    client.on('text-session', (data) => {
      io.in(data.code).emit('text-session-client', { message: data.state, sender: data.name });
    });

    client.on('join-session', (data) => {
      console.log('join-session received: ', data);
      client.join(data?.code);
      io.in(data?.code).emit('text-session-client', { message: 'user joined', sender: 'computer' });
      const isHost = data?.host === 'me';
      if (isHost) {
        roomHosts[data?.code] = client.id;
        console.log('room hosts updated: ', roomHosts);
      }
      if (isHost) {
        console.log(client.id, ' joined room ', data?.code, isHost ? ' as host' : ' as regular user');
      }
    });

    client.on('leave-session', (data) => {
      client.leave(data.code);
      if (data.host === 'me') {
        io.in(data.code).emit('host-left-session', data.code);
      } else {
        io.in(data.code).emit('text-session-client', { message: 'user left', sender: 'computer' });
      }
      console.log('Left room: ', data.code);
    });
  });
};

const socket = {
  createServer,
};

export default socket;
