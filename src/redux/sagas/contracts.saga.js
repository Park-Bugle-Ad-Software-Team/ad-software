import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* contractsSaga() {
    yield takeLatest('FETCH_PENDING_CONTRACTS', fetchPendingContracts);
    yield takeLatest('FETCH_ACTIVE_CONTRACTS', fetchActiveContracts);
    yield takeLatest('FETCH_CLOSED_CONTRACTS', fetchClosedContracts);
}

function* fetchPendingContracts(action) {
    if (action.payload.authLevel === 'advertiser') {
        try {
            const response = yield axios.get('/api/contracts/pending/advertiser', {params: action.payload});
            // console.log('response is', response);
    
            yield put({ type: 'SET_PENDING_CONTRACTS', payload: response.data});
        
        } catch (error) {
            console.log('Pending contracts GET request failed', error);
        }
    } else {
        try {
            const response = yield axios.get('/api/contracts/pending');
            // console.log('response is', response);

            yield put({ type: 'SET_PENDING_CONTRACTS', payload: response.data});
        
        } catch (error) {
            console.log('Pending contracts GET request failed', error);
        }
    }
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

function* fetchClosedContracts() {
    try {
        const response = yield axios.get('/api/contracts/closed');
        // console.log('response is', response);

        yield put({ type: 'SET_CLOSED_CONTRACTS', payload: response.data});
    
    } catch (error) {
        console.log('Closed contracts GET request failed', error);
    }
}