import { useContext, useEffect, useState } from "react";
import gameContext from "../../gameContext";
import gameService from "../../services/GameService/GameService";
import socketService from "../../services/SocketService/SocketService";
import { Card, IStartGame } from "../../interfaces";
import Modal from "../Modal/Modal";
import "./Game.css";
import { completeCardsDeck } from "../../data";

const Game = () => { // the actual game

  const [modalOpened, setModalOpened] = useState(false);
  const [gameInitialized, setGameInitialized] = useState(false);

  /**
   * Retrieve the data that we need from the context
   */
  const {
    betPlayer1,
    betPlayer2,
    setBetPlayer1,
    setBetPlayer2,
    setPlayerTurn,
    isPlayerTurn,
    player1Cards,
    player2Cards,
    setDealerCards,
    player1Chips,
    player2Chips,
    setGameStarted,
    isGameStarted,
    setPlayer1Cards,
    setPlayer1Chips,
    setPlayer2Cards,
    setPlayer2Chips,
    playerName,
    setPlayerName,
    dealerCards,
    setCardsDeck,
    cardsDeck
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

  const checkCards = () => {
    
  }

  const updateGame = () => {
    setPlayerTurn(false);
  }

  /**
     * function that handles the start of the game which changes values from the context and displayed screen
     */
  const handleGameStart = () => {
    if(socketService.socket) {
      gameService.onStartGame(socketService.socket, (options: IStartGame) => {
        setGameStarted(true);
        setPlayerName(options.playerName);
        if(options.start) {
          setPlayerTurn(true);
          setModalOpened(true);
        }
        else {
          setPlayerTurn(false);
        }
      });
    }
  };

  /**
     * function that handles the initialization of the game which changes values from the context
     */
  const handleGameInitialization = () => {
    if(socketService.socket) {
      gameService.onGameInitialization(socketService.socket, (options) => {
        if(!betPlayer1 || !betPlayer2) {
          if(playerName === "player1") {
            setPlayer2Chips(options.player2Chips!);
            setBetPlayer2(options.betPlayer2!);
            //setModalOpened(false);
  
          } else {
           // setModalOpened(true);
            setPlayer1Chips(options.player1Chips!);
            setBetPlayer1(options.betPlayer1!);
          }
        }
        if(options.cardsDeck!.length > 0 && options.player1Cards!.length > 0 && options.player2Cards!.length && options.dealerCards!.length > 0) {
          console.log('if-ul lung din handlegameinitialization')
          setCardsDeck(options.cardsDeck!);
          setPlayer1Cards(options.player1Cards!);
          setPlayer2Cards(options.player2Cards!);
          setDealerCards(options.dealerCards!);
        }
        setPlayerTurn(true);
      })
    }
  }

  /**
     * function that handles the update of the game which changes values from the context
     */
  const handleGameUpdate = () => {
    if(socketService.socket) {
      gameService.onGameUpdate(socketService.socket, (options) => {
        
        //checkGameState(options.cardsDeck!);
        //setPlayerTurn(true);
      });
    }
  }

  /**
     * function that handles the winning of the game which changes values from the context
     */
  const handleGameWin = () => {
    if(socketService.socket) {
      gameService.onGameWin(socketService.socket, (message) => {
        setPlayerTurn(false);
        alert(message);
      });
    }
  }; 

  /**
     * function that handles the displaying of the game table for player
     */
  const displayPlayerScreen = () => {
    return(
      <div className="game-table__details">
                
                <p>Dealer's cards: {dealerCards.map(item => {
                  if(item.visible === false) 
                    return (<img className="image-card" src={`${process.env.PUBLIC_URL}/card_back.png`} key={item.imageSource}/>)
                  else 
                    return (<img className="image-card" src={`${process.env.PUBLIC_URL}/${item.imageSource}`} key={item.imageSource}/>)})}</p>

                  {playerName === "player1" ? (
                    <div className="player-container">
                      <p>Your Bet: {betPlayer1} $</p>
                
                      <p>Your cards: {player1Cards.map(item => <img className="image-card" src={`${process.env.PUBLIC_URL}/${item.imageSource}`} key={item.imageSource}/>)}</p>
                      
                      <p>Money left over: {player1Chips} $</p>

                      <p>Player 2 Bet: {betPlayer2} $</p>
                      
                      <p>Player 2 cards: {player2Cards.map(item => <img className="image-card" src={`${process.env.PUBLIC_URL}/${item.imageSource}`} key={item.imageSource}/>)}</p>
                    </div>
                  ) : (
                    <div className="player-container">
                      <p>Player 1 Bet: {betPlayer1} $</p>
                
                      <p>Player 1 cards: {player1Cards.map(item => <img className="image-card" src={`${process.env.PUBLIC_URL}/${item.imageSource}`} key={item.imageSource}/>)}</p>

                      <p>Your Bet: {betPlayer2} $</p>
                      
                      <p>Your cards: {player2Cards.map(item => <img className="image-card" src={`${process.env.PUBLIC_URL}/${item.imageSource}`} key={item.imageSource}/>)}</p>

                      <p>Money left over: {player2Chips} $</p>
                    </div>
                  )}
        
                <button className="hit-button" onClick={handleGameUpdate} disabled={!isPlayerTurn}>HIT</button>
                <button className="stand-button" onClick={handleGameUpdate} disabled={!isPlayerTurn}>STAND</button>
        </div>
    )
  }

  const shuffleCardsDeck = (array: Card[]) => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

  useEffect(() => {
    handleGameStart();
    handleGameInitialization();
    handleGameUpdate();
    handleGameWin();
  }, []);


  useEffect(() => {
    if(betPlayer1 && betPlayer2) {
      console.log('betplayer1 & betplayer2: ', betPlayer1, betPlayer2)
      const cardsDeckShuffled = shuffleCardsDeck(completeCardsDeck);
      gameService.initializeGame(socketService.socket!, {cardsDeck: cardsDeckShuffled, player1Cards: [cardsDeckShuffled[0], cardsDeckShuffled[3]], player2Cards: [cardsDeckShuffled[1], cardsDeckShuffled[4]], dealerCards: [cardsDeckShuffled[2], cardsDeckShuffled[5]]})
      setCardsDeck(cardsDeckShuffled);
      setPlayer1Cards([cardsDeckShuffled[0], cardsDeckShuffled[3]]);
      setPlayer2Cards([cardsDeckShuffled[1], cardsDeckShuffled[4]]);
      setDealerCards([cardsDeckShuffled[2], cardsDeckShuffled[5]]);
      }
  }, [betPlayer1, betPlayer2])

  

  useEffect(() => {
    console.log("ardsDeck, dealerCards, player1Cards, player2Cards: ", cardsDeck, dealerCards, player1Cards, player2Cards)
    if(cardsDeck.length > 0 && dealerCards.length > 0 && player1Cards.length > 0 && player2Cards.length > 0) {
      setModalOpened(false);
      setGameInitialized(true);
    }
  }, [cardsDeck, dealerCards, player1Cards, player2Cards])

  useEffect(() => {
    console.log('gameinitialized: ', gameInitialized)
  }, [gameInitialized])

  return (
    <div className="game-container">
      {!isGameStarted ? (
        <h2>Waiting for the other player to join the game...</h2>
      ) :
      <div className="game-table">
        {modalOpened ? (
        <Modal isOpened={modalOpened} setIsOpenedCallback={setModalOpened} modalOperationType="initialization" setPlayerTurn={setPlayerTurn} />
        ) : (!gameInitialized ? <h2>Waiting for the other player to place the bet...</h2> : displayPlayerScreen())
        }
      </div>
      }

    </div>
  );
}

export default Game;