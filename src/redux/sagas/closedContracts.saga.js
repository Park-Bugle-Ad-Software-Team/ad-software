import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* closedContractsSaga() {
    yield takeLatest('FETCH_CLOSED_CONTRACTS', fetchClosedContracts);
}

function* fetchClosedContracts() {
    try {
        const response = yield axios.get('/api/contracts/closed');
        // console.log('response is', response);

        yield put({ type: 'SET_CLOSED_CONTRACTS', payload: response.data});
    
    } catch (error) {
        console.log('Closed contracts GET request failed', error);
    }
}