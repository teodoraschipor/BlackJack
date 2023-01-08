import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { INITIALIZATION } from "../../constants";
import gameContext from "../../gameContext";
import gameService from "../../services/GameService/GameService";
import socketService from "../../services/SocketService/SocketService";
import { ModalOperationType } from "../../types";
import "./Modal.css";

interface IProps {    
    isOpened: boolean;
    setIsOpenedCallback: Function;
    modalOperationType: ModalOperationType;
    setPlayerTurn: Function;
}

const Modal: FunctionComponent<IProps> = (props) => {

    const [betValue, setBetValue] = useState(0);

    // Retrieve the data that we need from the context
    const {
        betPlayer1,
        betPlayer2,
        player1Chips,
        player2Chips,
        playerName,
        setPlayer1Chips,
        setPlayer2Chips,
        setBetPlayer1,
        setBetPlayer2,
        cardsDeck,
        dealerCards,
        player1Cards,
        player2Cards,
    } = useContext(gameContext);

    /**
     * function that shuffles the cards deck
     * @param {array} array - the array of cards which represents the cards deck 
     */

    /**
     * function that handles the onClick which changes values from the context and dispatches events
     * @param {number} betValue - the value of the bet entered in input by the player 
     */
    const handleOnClick = (betValue: number) => {
        if(socketService.socket) {
            if(props.modalOperationType === INITIALIZATION) {
                if(playerName === "player1") {
                    const playerChipsResult = player1Chips! - betValue;
                    gameService.initializeGame(socketService.socket, { player1Chips: playerChipsResult, betPlayer1: betValue });
                    setPlayer1Chips(playerChipsResult);
                    setBetPlayer1(betValue);
                } else {
                    const playerChipsResult = player2Chips! - betValue;
                    gameService.initializeGame(socketService.socket, { player2Chips: playerChipsResult, betPlayer2: betValue });
                    setPlayer2Chips(playerChipsResult);
                    setBetPlayer2(betValue);
                    //props.setPlayerWaitingScreen(false);
                   // gameService.initializeGame(socketService.socket, {cardsDeck: cardsDeckShuffled, player1Cards: [cardsDeckShuffled[0], cardsDeckShuffled[3]], player2Cards: [cardsDeckShuffled[1], cardsDeckShuffled[4]], dealerCards: [cardsDeckShuffled[2], cardsDeckShuffled[5]]})
                }
                props.setIsOpenedCallback(false);
                props.setPlayerTurn(false);
            } else {
                gameService.updateGame(socketService.socket, {});
            }            
        }      
    }

    /*
    const handleCheckCards = () => {
        if(socketService.socket && dealerCards.length > 0 && playerCards.length > 0) {
            gameService.checkCards(socketService.socket, { dealerCards, playerCards });
            props.setIsOpenedCallback(false);  
        }
    }

    useEffect(() => {
        if(currentBet > 0) {
            handleCheckCards();
        }
    }, [currentBet])
    */

    return(
        <div className={`modal-container ${props.isOpened ? "opened" : "closed"}`}>
            <p>Place your bet</p>
            <input value={betValue} onChange={(e: React.ChangeEvent<any>) => {
                setBetValue(e.target.value)
            }} placeholder="Enter a NUMBER" />
            <button onClick={() => handleOnClick(+betValue)} disabled={isNaN(betValue!) || betValue <= 0}>Set Bet</button> {/* disabled={!betValue.isNaN} */}
        </div>
    );
}

export default Modal;