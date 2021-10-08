import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* advertisersSaga() {
    yield takeLatest('FETCH_ADVERTISERS', fetchAdvertisers);
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