import * as actionTypes from './actionTypes';
import { distanceFindHandler } from './distanceFind';
import { closestCountry } from './closeCountry'

const inintialState = {
    auth: false,
    distnase: null,
    closeCountiry: null,
    authenticated: null
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
        case actionTypes.AUTH_START:
            console.log(action)
            if(action.payload.email==='rneelaka@gamil.com' && action.payload.password === '123456'){
                console.log('abc')
                const authStatus = 'authenticated'
                return {
                    ...state,
                    authenticated: authStatus
                }
            }
            break;
    }
    return state;
};

export default reducer;