import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* pendingContractsSaga() {
    yield takeLatest('FETCH_PENDING_CONTRACTS', fetchPendingContracts);
}

function* fetchPendingContracts() {
    try {
        const response = yield axios.get('/api/contracts/pending');
        // console.log('response is', response);

        yield put({ type: 'SET_PENDING_CONTRACTS', payload: response.data});
    
    } catch (error) {
        console.log('Pending contracts GET request failed', error);
    }
}