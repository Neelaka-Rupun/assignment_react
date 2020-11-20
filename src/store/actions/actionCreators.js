
import * as actionTypes from './actionTypes';

export const findDistance = (country1, country2, countries) => {
    return {
        type: actionTypes.FIND_DISTANCE,
        payload: { country1: country1, country2: country2, countries: countries }
    };
}

export const closeCountry = (country1, countries) => {
    return {
        type: actionTypes.CLOSE_COUNTRY,
        payload:{ country1:country1, countries: countries }
    };
}

export const  authStart = (email, password, counter)  => {
    return {
        type: actionTypes.AUTH_START,
        payload:{email: email, password: password, counter: counter}
    }
}