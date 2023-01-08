import React from "react";
import { IGameContextProps } from "./interfaces";

const defaultState: IGameContextProps = {
  roomName: "",
  setRoomName: () => {},
  isInRoom: false,
  setInRoom: () => {},
  playerName: "",
  setPlayerName: () => {},
  player1Cards: [],
  setPlayer1Cards: () => {},
  player2Cards: [],
  setPlayer2Cards: () => {},
  dealerCards: [],
  setDealerCards: () => {},
  betPlayer1: 0,
  setBetPlayer1: () => {},
  betPlayer2: 0,
  setBetPlayer2: () => {},
  cardsDeck: [],
  setCardsDeck: () => {},
  player1Chips: 1000,
  setPlayer1Chips: () => {},
  player2Chips: 1000,
  setPlayer2Chips: () => {},
  isPlayerTurn: false,
  setPlayerTurn: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
};

export default React.createContext(defaultState);
