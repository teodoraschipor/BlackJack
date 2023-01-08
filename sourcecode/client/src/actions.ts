import { DEAL, DEALER_HIT, DOUBLE, HIT, INSURANCE, INVALID, RESTORE, SHOWDOWN, SPLIT, STAND, SURRENDER } from "./constants"
import { IAction } from "./interfaces"

export const invalid = (action: IAction, info: any): IAction => {
    return {
      type: INVALID,
      payload: {
        type: action.type,
        payload: action.payload,
        info: info
      }
    }
  }
  
  export const restore = (): IAction => {
    return {
      type: RESTORE
    }
  }
  
  export const deal = ({ bet = 10, sideBets = { luckyLucky: 0 } }): IAction => {
    return {
      type: DEAL,
      payload: {
        bet,
        sideBets
      }
    }
  }
  
  export const insurance = ({ bet = 0 }: { bet: number }): IAction => {
    return {
      type: INSURANCE,
      payload: {
        bet
      }
    }
  }
  
  export const split = (): IAction => {
    return {
      type: SPLIT
    }
  }
  
  export const hit = ({ position = 'right' }: { position: string }): IAction => {
    return {
      type: HIT,
      payload: {
        position
      }
    }
  }
  
  export const double = ({ position = 'right' }: { position: string }): IAction => {
    return {
      type: DOUBLE,
      payload: {
        position
      }
    }
  }
  
  export const stand = ({ position = 'right' }: { position: string }): IAction => {
    return {
      type: STAND,
      payload: {
        position
      }
    }
  }
  
  export const surrender = (): IAction => {
    return {
      type: SURRENDER
    }
  }
  
  export const showdown = ({ dealerHoleCardOnly = false }): IAction => {
    return {
      type: SHOWDOWN,
      payload: {
        dealerHoleCardOnly
      }
    }
  }
  
  export const dealerHit = ({dealerHoleCard = false}): IAction => {
    return {
      type: DEALER_HIT,
      payload: {
        dealerHoleCard
      }
    }
  }