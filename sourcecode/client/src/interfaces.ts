export interface Card {
    imageSource: string,
    value: number | number[],
}

export interface IGameContextProps { // the state
    roomName: string,
    setRoomName: (roomName: string) => void,
    isInRoom: boolean,
    setInRoom: (inRoom: boolean) => void,
    playerId: string,
    setPlayerId: (playerId: string) => void;
    dealerId: string,
    setDealerId: (dealerId: string) => void,
    playerCards: Card[],
    setPlayerCards: (cards: Card[]) => void,
    dealerCards: Card[],
    setDealerCards: (cards: Card[]) => void,
    currentBet: number,
    setCurrentBet: (bet: number) => void,
    cardsDeck: Card[],
    setCardsDeck: (cards: Card[]) => void,
    playerChips: number | null;
    setPlayerChips: (chips: number) => void,
    isPlayerTurn: boolean,
    setPlayerTurn: (turn: boolean) => void,
    isGameStarted: boolean,
    setGameStarted: (started: boolean) => void,
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