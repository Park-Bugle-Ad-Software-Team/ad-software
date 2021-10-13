import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* chatSaga() {
    yield takeLatest('FETCH_CHAT', fetchChat);
}

function* fetchChat(action) {
    const contractId = action.payload;
    try {
        const response = yield axios.get('/api/chat/', { params: contractId });
        // console.log('response is', response);

        yield put({ type: 'SET_CHAT', payload: response.data});
    
    } catch (error) {
        console.log('Chat GET request failed', error);
    }
}