import React from "react";
import { IGameContextProps } from "./typesAndInterfaces";

const defaultState: IGameContextProps = {
  isInRoom: false,
  setInRoom: () => {},
  // playerCards: []
  // setPlayerCards: () => {}
  isPlayerTurn: false,
  setPlayerTurn: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
};

export default React.createContext(defaultState);
