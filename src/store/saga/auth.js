import { put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes'
import * as actions from '../actions/actionCreators';

export function* authUserSaga(action) {
    yield put({
        type: actionTypes.AUTH_START,
        payload:{email: action.payload.email, password: action.payload.password, counter: action.payload.counter}
    });
}