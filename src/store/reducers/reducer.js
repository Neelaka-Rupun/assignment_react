import * as actionTypes from '../actions/actionTypes';
import { distanceFindHandler } from './distanceFind';
import { closestCountry } from './closeCountry'

const inintialState = {
    auth: false,
    distnase: null,
    closeCountiry: null,
    authenticated: null,
    maxAttempts: false
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
            console.log(action);
            const colseCountry = closestCountry(action.payload.country1, action.payload.countries)
            return {
                ...state,
                closeCountiry: colseCountry
            }
        case actionTypes.AUTH_START:
            
            if (action.payload.email === 'rneelaka@gamil.com' && action.payload.password === '123456' && action.payload.counter <= 3) {
                return {
                    ...state,
                    authenticated: true
                }
            } else if (action.payload.counter > 3) {
                return {
                    ...state,
                    authenticated: null,
                    maxAttempts: true
                }
            }
            break;
    }
    return state;
};

export default reducer;