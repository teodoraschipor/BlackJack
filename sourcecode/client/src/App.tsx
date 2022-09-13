import React, { useEffect, useState } from "react";
import "./App.css";
import socketService from "./services/SocketService/SocketService";
import  JoinRoom  from "./components/JoinRoom/JoinRoom";
import GameContext from "./gameContext";
import Game from "./components/Game/Game";
import { IGameContextProps } from "./typesAndInterfaces";

const App = () => {
  const [isInRoom, setInRoom] = useState(false);
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

  const connectSocket = async () => {
    const socket = await socketService
      .connect("http://localhost:9000")
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  };

  return (
    <GameContext.Provider value={gameContextValue}>
      <div className="app-container">
        <h1 className="welcome-text">BlackJack</h1>
        <div className="main-container">
          {!isInRoom && <JoinRoom />}
          {isInRoom && <Game />}
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default App;
