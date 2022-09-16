import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { completeCardsDeck } from "../../data";
import gameContext from "../../gameContext";
import { Card } from "../../interfaces";
import "./Modal.css";

interface IProps {    
    isOpened: boolean;
    setIsOpenedCallback: Function;
}

const Modal: FunctionComponent<IProps> = (props) => {

    const [betValue, setBetValue] = useState(0);

    const {
        playerChips,
        setPlayerChips,
        currentBet,
        setCurrentBet,
        cardsDeck,
        setCardsDeck,
        playerCards,
        setPlayerCards,
        dealerCards,
        setDealerCards,
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

    const handleOnClick = (betValue: any) => {
        setCurrentBet(betValue);
        setCardsDeck(shuffleCardsDeck(completeCardsDeck));
    }

    useEffect(() => {
        if(currentBet > 0) {
            let aux = playerChips!;
            setPlayerChips(aux - currentBet);
        }
    }, [currentBet])

    useEffect(() => {
        if(cardsDeck.length > 0) {
            setPlayerCards([cardsDeck[0], cardsDeck[2]]);
            setDealerCards([cardsDeck[1], cardsDeck[3]]);
        }
    }, [cardsDeck])

    useEffect(() => {
        if(currentBet > 0 && playerChips! > 0 && cardsDeck.length > 0 && playerCards.length > 0)
            props.setIsOpenedCallback(false);
    }, [currentBet, playerChips, cardsDeck, playerCards])

    return(
        <div className={`modal-container ${props.isOpened ? "opened" : "closed"}`}>
            <p>Place your bet</p>
            <input value={betValue} onChange={(e: React.ChangeEvent<any>) => {
                console.log('bet value: ', e.target.value);
                console.log('bet value is nan: ', e.target.value.isNaN);
                setBetValue(e.target.value)
            }} placeholder="Enter a NUMBER" />
            <button onClick={() => handleOnClick(+betValue)} disabled={isNaN(betValue!) || betValue <= 0}>Set Bet</button> {/* disabled={!betValue.isNaN} */}
        </div>
    );
}

export default Modal;