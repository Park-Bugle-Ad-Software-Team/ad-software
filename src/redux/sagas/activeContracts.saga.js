import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* activeContractsSaga() {
    yield takeLatest('FETCH_ACTIVE_CONTRACTS', fetchActiveContracts);
}

function* fetchActiveContracts() {
    try {
        const response = yield axios.get('/api/contracts/active');
        // console.log('response is', response);

        yield put({ type: 'SET_ACTIVE_CONTRACTS', payload: response.data});
    
    } catch (error) {
        console.log('Active contracts GET request failed', error);
    }
}