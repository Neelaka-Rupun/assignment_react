import * as actionTypes from './actionTypes';
import { distanceFindHandler } from './distanceFind';
import { closestCountry } from './closeCountry'

const inintialState = {
    auth: false,
    distnase: null,
    closeCountiry: null

}

const reducer = (state = inintialState, action) => {
    switch (action.type) {
        case actionTypes.FIND_DISTANCE:
            const distnase = distanceFindHandler(action.payload.country1, action.payload.country2, action.payload.countries)
            return {
                ...state,
                distnase: distnase
            }
        case actionTypes.CLOSE_COUNTRY:
           const colseCountry = closestCountry(action.payload.country1, action.payload.countries)
          return {
              ...state,
              closeCountiry: colseCountry
          }

    }
    return state;
};

export default reducer;