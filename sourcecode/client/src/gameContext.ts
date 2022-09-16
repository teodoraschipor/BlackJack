import React from "react";
import { IGameContextProps } from "./interfaces";

const defaultState: IGameContextProps = {
  roomName: "",
  setRoomName: () => {},
  isInRoom: false,
  setInRoom: () => {},
  playerId: "",
  setPlayerId: () => {},
  dealerId: "",
  setDealerId: () => {},
  playerCards: [],
  setPlayerCards: () => {},
  currentBet: 0,
  dealerCards: [],
  setDealerCards: () => {},
  setCurrentBet: () => {},
  cardsDeck: [],
  setCardsDeck: () => {},
  playerChips: 1000,
  setPlayerChips: () => {},
  isPlayerTurn: false,
  setPlayerTurn: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
};

export default React.createContext(defaultState);
