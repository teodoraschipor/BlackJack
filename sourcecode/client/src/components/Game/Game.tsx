import { useContext, useEffect, useState } from "react";
import gameContext from "../../gameContext";
import gameService from "../../services/GameService/GameService";
import socketService from "../../services/SocketService/SocketService";
import { Card, IStartGame } from "../../interfaces";
import Modal from "../Modal/Modal";
import "./Game.css";

const Game = () => { // the actual game

  const [modalOpened, setModalOpened] = useState(false);
  const [dealerWaitingScreen, setDealerWaitingScreen] = useState(false);

  const {
    setPlayerTurn,
    currentBet,
    playerCards,
    setDealerCards,
    playerChips,
    setGameStarted,
    isGameStarted,
    setPlayerCards,
    setPlayerChips,
    setCurrentBet,
    playerType,
    setPlayerType,
    dealerCards,
    setCardsDeck,
  } = useContext(gameContext);

  const checkGameState = (newCardsDeck: Card[]) => {
    // TO DO
    // everytime that a player plays his move, we need to check the game state in order to tell if someone won or not
    // if nobody has won/lose, we call addPossibleActions() function to add new buttons if other actions are possible, like: double, insurance, settlement, etc.
  };

  const addPossibleActions = () => {
    // TO DO
    // we check the current player's Cards values so we can add other actions that are possible
  }

  const updateGame = () => {
    setPlayerTurn(false);
  }

  const handleGameStart = () => {
    if (socketService.socket)
      gameService.onStartGame(socketService.socket, (options: IStartGame) => {
        setGameStarted(true);
        setPlayerType(options.playerType);
        if(options.start) {
          setPlayerTurn(true);
          setModalOpened(true);
        }
        else {
          setPlayerTurn(false);
          setDealerWaitingScreen(true);
        }
      });
  };

  const handleGameUpdate = () => {
    if (socketService.socket)
      gameService.onGameUpdate(socketService.socket, (options) => {
        setDealerCards(options.dealerCards!);
        setPlayerCards(options.playerCards!);
        setCardsDeck(options.cardsDeck!);
        setPlayerChips(options.playerChips!);
        setCurrentBet(options.currentBet!);
        //checkGameState(options.cardsDeck!);
        setPlayerTurn(true);
      });
  }

  useEffect(() => {
    console.log('playertype useeffect: ', playerType)
  }, [playerType])

  const handleGameWin = () => {
    if (socketService.socket)
      gameService.onGameWin(socketService.socket, (message) => {
        setPlayerTurn(false);
        alert(message);
      });
  }; 

  const displayDealerScreen = () => {
    return(
      <div className="game-table__details">
                
                <p>Player's cards: {playerCards.map(item => <img className="image-card" src={`${process.env.PUBLIC_URL}/${item.imageSource}`} key={item.imageSource}/>)}</p>
               
                <p>Bet: {currentBet} $</p>
                
                <p>Your cards: {dealerCards.map(item => <img className="image-card" src={`${process.env.PUBLIC_URL}/${item.imageSource}`} key={item.imageSource}/>)}</p>

                <button className="hit-button" onClick={handleGameUpdate}>HIT</button>
                <button className="stand-button" onClick={handleGameUpdate}>STAND</button>
        </div>
    )
  }

  const displayPlayerScreen = () => {
    return(
      <div className="game-table__details">
                
                <p>Dealer's cards: {dealerCards.map(item => <img className="image-card" src={`${process.env.PUBLIC_URL}/${item.imageSource}`} key={item.imageSource}/>)}</p>
               
                <p>Bet: {currentBet} $</p>
                
                <p>Your cards: {playerCards.map(item => <img className="image-card" src={`${process.env.PUBLIC_URL}/${item.imageSource}`} key={item.imageSource}/>)}</p>
                
                <p>Money left over: {playerChips} $</p>
                <button className="hit-button" onClick={handleGameUpdate}>HIT</button>
                <button className="stand-button" onClick={handleGameUpdate}>STAND</button>
        </div>
    )
  }

  useEffect(() => {
    handleGameStart();
    handleGameUpdate();
    handleGameWin();
  }, []);

  useEffect(() => {
    if(currentBet) {
      setDealerWaitingScreen(false);
      setModalOpened(false);
    }
  }, [currentBet])

  return (
    <div className="game-container">
      {!isGameStarted ? (
        <h2>You are the dealer, wait for the player to place his bet</h2>
      ) :
      <div className="game-table">
        {modalOpened ? (
        <Modal isOpened={modalOpened} setIsOpenedCallback={setModalOpened} />
        ) : dealerWaitingScreen ? (<h2>Waiting for the player to place the bet...</h2>) : 
          playerType === "player" ? displayPlayerScreen() : displayDealerScreen()
        }
      </div>
      }

    </div>
  );
}

export default Game;