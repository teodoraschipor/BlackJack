import { useContext, useEffect, useState } from "react";
import gameContext from "../../gameContext";
import gameService from "../../services/GameService/GameService";
import socketService from "../../services/SocketService/SocketService";
import { Card } from "../../interfaces";
import Modal from "../Modal/Modal";
import "./Game.css";

const Game = () => { // the actual game

  const [modalOpened, setModalOpened] = useState(false);

  const {
    setPlayerTurn,
    setCardsDeck,
    currentBet,
    playerCards,
    dealerCards,
    playerChips,
    setGameStarted,
    isGameStarted,
    setPlayerCards,
    setPlayerChips,
    setCurrentBet,
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

  const handleGameStart = () => {
    console.log('handlegamestart')
    if (socketService.socket)
      gameService.onStartGame(socketService.socket, (options) => {
        setGameStarted(true);
       /* if (options.start) setPlayerTurn(true);
        else setPlayerTurn(false);
        TO DO
        */
       setModalOpened(true);
      });
  };

  const handleGameUpdate = () => {
    if (socketService.socket)
      gameService.onGameUpdate(socketService.socket, (options) => {
        setCardsDeck(options.newCardsDeck);
        setPlayerCards(options.newPlayerCards);
        setPlayerChips(options.newPlayerChips);
        setCurrentBet(options.newCurrentBet);
        checkGameState(options.newCardsDeck);
        setPlayerTurn(true);
      });
  }

  const handleGameWin = () => {
    if (socketService.socket)
      gameService.onGameWin(socketService.socket, (message) => {
        setPlayerTurn(false);
        alert(message);
      });
  }; 

  useEffect(() => {
    handleGameStart();
    handleGameUpdate();
    handleGameWin();
  }, []);

  return (

    <div className="game-container">
      {!isGameStarted ? (
        <h2>Waiting for other player to join to start the game...</h2>
      ) :
      <div className="game-table">
        {modalOpened ? (<Modal isOpened={modalOpened} setIsOpenedCallback={setModalOpened} />) :
         <div className="game-table__details">
         <p>Dealer Cards: {dealerCards.map(item => <img className="image-card" src={`${process.env.PUBLIC_URL}/${item.imageSource}`} key={item.imageSource}/>)}</p>
         <p>Bet: {currentBet} $</p>
         <p>Cards: {playerCards.map(item => <img className="image-card" src={`${process.env.PUBLIC_URL}/${item.imageSource}`} key={item.imageSource}/>)}</p>
         <p>Money left over: {playerChips} $</p>
         <button className="hit-button" onClick={handleGameUpdate}>HIT</button>
         <button className="stand-button" onClick={handleGameUpdate}>STAND</button>
       </div>
        }

        {/*
            {(socketService.socket!.id !== dealerId) ? (
            <h2>You are the dealer, wait for the player to place his bet</h2>
            ) : 
            (modalOpened && (<Modal isOpened={modalOpened} setIsOpenedCallback={setModalOpened} />))}
        */}
      </div>
      }

    </div>
  );
}

export default Game;