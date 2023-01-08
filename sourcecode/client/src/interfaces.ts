import { PlayerName } from "./types";

export interface Card {
    imageSource: string,
    value: number | number[],
    visible?: boolean,
}

export interface IStartGame {
    start: boolean,
    playerName: PlayerName,
}

export interface IAction {
    type: string,
    payload?: any,
}

export interface IGameContextProps { // the state
    roomName: string,
    setRoomName: (roomName: string) => void,
    isInRoom: boolean,
    setInRoom: (inRoom: boolean) => void,
    playerName: PlayerName | "",
    setPlayerName: (playerName: PlayerName) => void,
    player1Cards: Card[],
    setPlayer1Cards: (cards: Card[]) => void,
    player2Cards: Card[],
    setPlayer2Cards: (cards: Card[]) => void,
    dealerCards: Card[],
    setDealerCards: (cards: Card[]) => void,
    betPlayer1: number,
    setBetPlayer1: (betValue: number) => void,
    betPlayer2: number,
    setBetPlayer2: (betValue: number) => void,
    cardsDeck: Card[],
    setCardsDeck: (cards: Card[]) => void,
    player1Chips: number | null;
    setPlayer1Chips: (chips: number) => void,
    player2Chips: number | null;
    setPlayer2Chips: (chips: number) => void,
    isPlayerTurn: boolean,
    setPlayerTurn: (turn: boolean) => void,
    isGameStarted: boolean,
    setGameStarted: (started: boolean) => void,
}

export interface IGameContextPropsOptional {
    roomName?: string,
    setRoomName?: (roomName: string) => void,
    isInRoom?: boolean,
    setInRoom?: (inRoom: boolean) => void,
    playerName?: PlayerName | "",
    setPlayerName?: (playerName: PlayerName) => void,
    player1Cards?: Card[],
    setPlayer1Cards?: (cards: Card[]) => void,
    player2Cards?: Card[],
    setPlayer2Cards?: (cards: Card[]) => void,
    dealerCards?: Card[],
    setDealerCards?: (cards: Card[]) => void,
    betPlayer1?: number,
    setBetPlayer1?: (betValue: number) => void,
    betPlayer2?: number,
    setBetPlayer2?: (betValue: number) => void,
    cardsDeck?: Card[],
    setCardsDeck?: (cards: Card[]) => void,
    player1Chips?: number | null;
    setPlayer1Chips?: (chips: number) => void,
    player2Chips?: number | null;
    setPlayer2Chips?: (chips: number) => void,
    isPlayerTurn?: boolean,
    setPlayerTurn?: (turn: boolean) => void,
    isGameStarted?: boolean,
    setGameStarted?: (started: boolean) => void,
}

export interface IAvailableActions  {
    double: boolean,
    split: boolean,
    insurance: boolean,
    hit: boolean,
    stand: boolean,
    surrender: boolean
}

export interface IHandValue  {
    high: number,
    low: number
  }