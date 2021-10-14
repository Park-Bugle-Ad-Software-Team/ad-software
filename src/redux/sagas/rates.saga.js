import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* ratesSaga() {
    yield takeLatest('FETCH_RATES_TO_EDIT', fetchRatesToEdit);
}

function* fetchRatesToEdit() {
    try {
        const response = yield axios.get('/api/rates/edit');
        yield put({
            type: 'SET_RATES_TO_EDIT',
            payload: response.data,
        })
    } catch (error) {
        console.error('fetching rate to edit failed', error);
    }
}