import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* advertisersSaga() {
    yield takeLatest('FETCH_ADVERTISERS', fetchAdvertisers);
    yield takeLatest('FETCH_AD_REPS', fetchAdReps);
    yield takeLatest('FETCH_DESIGNERS', fetchDesigners);

}

function* fetchDesigners() {
    try {
        const response = yield axios.get('/api/user/designers');
        console.log('response is', response);

        yield put({ type: 'SET_DESIGNERS', payload: response.data});
    
    } catch (error) {
        console.log('Designers GET request failed', error);
    }
}

function* fetchAdReps() {
    try {
        const response = yield axios.get('/api/user/adReps');
        console.log('response is', response);

        yield put({ type: 'SET_AD_REPS', payload: response.data});
    
    } catch (error) {
        console.log('Ad Reps GET request failed', error);
    }
}

function* fetchAdvertisers() {
    try {
        const response = yield axios.get('/api/user/advertisers');
        console.log('response is', response);

        yield put({ type: 'SET_ADVERTISERS', payload: response.data});
    
    } catch (error) {
        console.log('Advertisers GET request failed', error);
    }
}