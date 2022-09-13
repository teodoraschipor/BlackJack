export interface Card {
    rank: string,
    suit: string,
}

export interface IGameContextProps { // the state
    isInRoom: boolean;
    setInRoom: (inRoom: boolean) => void;
    // playerCards: Card;
    // setPlayerCards: (cards: Card[]) => void;
    isPlayerTurn: boolean;
    setPlayerTurn: (turn: boolean) => void;
    isGameStarted: boolean;
    setGameStarted: (started: boolean) => void;
}