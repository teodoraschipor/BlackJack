import { useSocketServer } from "socket-controllers";
import { Server } from "socket.io";

export default (httpServer) => {
  const socketIo = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  useSocketServer(socketIo, { controllers: [__dirname + "/controllers/*.ts"] });

  return socketIo;
};
