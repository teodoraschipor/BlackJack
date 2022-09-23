import { useEffect, useState } from "react";
import "./App.css";
import socketService from "./services/SocketService/SocketService";
import  JoinRoom  from "./components/JoinRoom/JoinRoom";
import GameContext from "./gameContext";
import Game from "./components/Game/Game";
import { Card, IGameContextProps } from "./interfaces";
import { PlayerType } from "./types";

const App = () => {
  const [isInRoom, setInRoom] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [playerType, setPlayerType] = useState<PlayerType | "">("");
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [currentBet, setCurrentBet] = useState(0);
  const [cardsDeck, setCardsDeck] = useState<Card[]>([]);
  const [playerChips, setPlayerChips] = useState(1000);


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
    roomName,
    setRoomName,
    isInRoom,
    setInRoom,
    playerType,
    setPlayerType,
    playerCards,
    setPlayerCards,
    dealerCards,
    setDealerCards,
    currentBet,
    setCurrentBet,
    cardsDeck,
    setCardsDeck,
    playerChips,
    setPlayerChips,
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
