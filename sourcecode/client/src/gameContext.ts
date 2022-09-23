import React from "react";
import { IGameContextProps } from "./interfaces";

const defaultState: IGameContextProps = {
  roomName: "",
  setRoomName: () => {},
  isInRoom: false,
  setInRoom: () => {},
  playerType: "",
  setPlayerType: () => {},
  playerCards: [],
  setPlayerCards: () => {},
  dealerCards: [],
  setDealerCards: () => {},
  currentBet: 0,
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
