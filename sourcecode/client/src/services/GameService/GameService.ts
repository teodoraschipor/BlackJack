import { Socket } from "socket.io-client";
import { Card } from "../../interfaces";

class GameService { // takes care of anything related to a game: joining the room, sending updates, etc.

  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("join_game", { roomId });
      socket.on("room_joined", () => rs(true));
      socket.on("room_join_error", ({ error }) => rj(error));

    });
  }

  public async updateGame(socket: Socket) {
    // TO DO
    socket.emit("update_game");
  }

  public async onGameUpdate( // plays the role of a listener, that listenes to the updates, all the players will listen to any updates of the game
                              // whenever we're going to receive from gameController the message "on_game_update" we're going to listen to it 
    socket: Socket,
    listener: (options: {
      newCardsDeck: Card[],
      newPlayerCards: Card[],
      newPlayerChips: number,
      newCurrentBet: number,
    }) => void
  ) {
    socket.on("on_game_update", listener);
  }

  public async onStartGame(
    socket: Socket,
    listener: (start: boolean) => void
  ) {
    socket.on("start_game", listener);
  }

  public async gameWin(socket: Socket, message: string) {
    socket.emit("game_win", { message });
  }

  public async onGameWin(socket: Socket, listener: (message: string) => void) {
    socket.on("on_game_win", ({ message }) => listener(message));
  }
}

export default new GameService();
