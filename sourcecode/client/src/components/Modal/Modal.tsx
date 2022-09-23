import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { completeCardsDeck } from "../../data";
import gameContext from "../../gameContext";
import { Card } from "../../interfaces";
import gameService from "../../services/GameService/GameService";
import socketService from "../../services/SocketService/SocketService";
import { ModalOperationType } from "../../types";
import "./Modal.css";

interface IProps {    
    isOpened: boolean;
    setIsOpenedCallback: Function;
    modalOperationType: ModalOperationType;
}

const Modal: FunctionComponent<IProps> = (props) => {

    const [betValue, setBetValue] = useState(0);

    const {
        playerChips,
        setCardsDeck,
        setPlayerCards,
        setPlayerChips,
        setCurrentBet,
        setDealerCards,
        setPlayerTurn
    } = useContext(gameContext);

    const shuffleCardsDeck = (array: Card[]) => {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    const handleOnClick = (betValue: number) => {
        if(props.modalOperationType === "initialization") {
            const cardsDeckShuffled = shuffleCardsDeck(completeCardsDeck);
            cardsDeckShuffled[1].visible = false;
            const playerChipsResult = playerChips! - betValue;
            gameService.initializeGame(socketService.socket!, { currentBet: betValue, cardsDeck: cardsDeckShuffled, playerChips: playerChipsResult, playerCards: [cardsDeckShuffled[0], cardsDeckShuffled[2]], dealerCards: [cardsDeckShuffled[1], cardsDeckShuffled[3]] });
            setCardsDeck(cardsDeckShuffled!);
            setPlayerCards([cardsDeckShuffled[0], cardsDeckShuffled[2]]);
            setDealerCards([cardsDeckShuffled[1], cardsDeckShuffled[3]])
            setPlayerChips(playerChipsResult);
        } else {
            gameService.updateGame(socketService.socket!, {});
        }
        setCurrentBet(betValue);
        props.setIsOpenedCallback(false);
    }

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