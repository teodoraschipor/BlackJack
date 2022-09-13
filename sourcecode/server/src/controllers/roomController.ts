import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Server, Socket } from "socket.io";

@SocketController()
export class RoomController {
  @OnMessage("join_game")
  public async joinGame(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    console.log("New User joining room: ", message);
    
    const connectedSockets = io.sockets.adapter.rooms.get(message.roomId); // we need to know what are the other sockets that are connected to the room that is being requested to join on
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (room) => room !== socket.id
    ); // get the rooms that the current socket is connected to (not the default room which has the name == socket.id)


    // only 2 sockets/users can connect to a room
    if (
      socketRooms.length > 0 ||
      (connectedSockets && connectedSockets.size === 2)
    ) {
      socket.emit("room_join_error", {
        error: "Room is full please choose another room to play!",
      });
    } else {
      await socket.join(message.roomId);
      socket.emit("room_joined");

      if (io.sockets.adapter.rooms.get(message.roomId).size === 2) {
        socket.emit("start_game", { });
        socket
          .to(message.roomId)
          .emit("start_game", { });
      }
    }
  }
}
