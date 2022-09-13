import { useContext, useEffect } from "react";
import gameContext from "../../gameContext";
import gameService from "../../services/GameService/GameService";
import socketService from "../../services/SocketService/SocketService";
import "./Game.css";

const Game = () => { // the actual game

  const {
    setPlayerTurn,
    isPlayerTurn,
    setGameStarted,
    isGameStarted,
  } = useContext(gameContext);

  const checkGameState = () => {
    // TO DO
    // everytime that a player plays his move, we need to check the game state in order to tell if someone won or not
  };

  const handleGameStart = () => {
    // TO DO
    if (socketService.socket)
      gameService.onStartGame(socketService.socket, (start) => {
        setGameStarted(true);
        // set player turn to true
      });
  };

  const handleGameWin = () => {
    if (socketService.socket)
      gameService.onGameWin(socketService.socket, (message) => {
        setPlayerTurn(false);
        alert(message);
      });
  }; 

  useEffect(() => {
    handleGameStart();
    handleGameWin();
  }, []);

  return (
    <div className="game-container">
      {!isGameStarted && (
        <h2>Waiting for other player to join to start the game...</h2>
      )}
    </div>
  );
}

export default Game;