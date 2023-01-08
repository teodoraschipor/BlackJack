import { useEffect, useState } from "react";
import "./App.css";
import socketService from "./services/SocketService/SocketService";
import  JoinRoom  from "./components/JoinRoom/JoinRoom";
import GameContext from "./gameContext";
import Game from "./components/Game/Game";
import { Card, IGameContextProps } from "./interfaces";
import { PlayerName } from "./types";

const App = () => {
  const [isInRoom, setInRoom] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [playerName, setPlayerName] = useState<PlayerName | "">("");
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [player1Cards, setPlayer1Cards] = useState<Card[]>([]);
  const [player2Cards, setPlayer2Cards] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [cardsDeck, setCardsDeck] = useState<Card[]>([]);
  const [player1Chips, setPlayer1Chips] = useState(1000);
  const [player2Chips, setPlayer2Chips] = useState(1000);
  const [betPlayer1, setBetPlayer1] = useState(0);
  const [betPlayer2, setBetPlayer2] = useState(0);

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
    playerName,
    setPlayerName,
    player1Cards,
    setPlayer1Cards,
    player2Cards,
    setPlayer2Cards,
    dealerCards,
    setDealerCards,
    betPlayer1,
    setBetPlayer1,
    betPlayer2,
    setBetPlayer2,
    cardsDeck,
    setCardsDeck,
    player1Chips,
    setPlayer1Chips,    
    player2Chips,
    setPlayer2Chips,
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
