import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { completeCardsDeck } from "../../data";
import gameContext from "../../gameContext";
import { Card } from "../../interfaces";
import gameService from "../../services/GameService/GameService";
import socketService from "../../services/SocketService/SocketService";
import "./Modal.css";

interface IProps {    
    isOpened: boolean;
    setIsOpenedCallback: Function;
}

const Modal: FunctionComponent<IProps> = (props) => {

    const [betValue, setBetValue] = useState(0);

    const {
        playerChips,
        currentBet,
        setCardsDeck,
        setPlayerCards,
        setPlayerChips,
        setCurrentBet,
        setDealerCards,
        setPlayerType
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
        const cardsDeckShuffled = shuffleCardsDeck(completeCardsDeck);
        const playerChipsResult = playerChips! - betValue;
        gameService.updateGame(socketService.socket!, { currentBet: betValue, cardsDeck: cardsDeckShuffled, playerChips: playerChipsResult, playerCards: [cardsDeckShuffled[0], cardsDeckShuffled[2]], dealerCards: [cardsDeckShuffled[1], cardsDeckShuffled[3]]})
        setCardsDeck(cardsDeckShuffled!);
        setPlayerCards([cardsDeckShuffled[0], cardsDeckShuffled[2]]);
        setDealerCards([cardsDeckShuffled[1], cardsDeckShuffled[3]])
        setPlayerChips(playerChipsResult);
        setCurrentBet(betValue);
        props.setIsOpenedCallback(false);
    }

    useEffect(() => {
        console.log('current bet from player: ', currentBet)
    }, [currentBet])

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