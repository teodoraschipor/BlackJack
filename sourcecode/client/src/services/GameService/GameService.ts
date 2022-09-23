import { Socket } from "socket.io-client";
import { IGameContextPropsOptional, IStartGame } from "../../interfaces";

class GameService { // takes care of anything related to a game: joining the room, sending updates, etc.

  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("join_game", { roomId });
      socket.on("room_joined", () => rs(true));
      socket.on("room_join_error", ({ error }) => rj(error));

    });
  }

  public async updateGame(socket: Socket, options: IGameContextPropsOptional) {
    socket.emit("update_game", options);
  }

  public async onGameUpdate( // plays the role of a listener, that listenes to the updates, the other players will listen to the updates of the game
                              // whenever we're going to receive from gameController the message "on_game_update" we're going to listen to it 
    socket: Socket,
    listener: (options: IGameContextPropsOptional) => void
  ) {
    socket.on("on_game_update", (options) => listener(options));
  }

  public async onStartGame(
    socket: Socket,
    listener: (options: IStartGame) => void
  ) {
    socket.on("start_game", listener); // listen for "start_game" events
  }

  public async gameWin(socket: Socket, message: string) {
    socket.emit("game_win", { message });
  }

  public async onGameWin(socket: Socket, listener: (message: string) => void) {
    socket.on("on_game_win", ({ message }) => listener(message));
  }
}

export default new GameService();
