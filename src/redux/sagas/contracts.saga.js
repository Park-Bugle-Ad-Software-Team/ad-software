import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* contractsSaga() {
    yield takeLatest('FETCH_PENDING_CONTRACTS', fetchPendingContracts);
    yield takeLatest('FETCH_ACTIVE_CONTRACTS', fetchActiveContracts);
    yield takeLatest('FETCH_CLOSED_CONTRACTS', fetchClosedContracts);
    yield takeLatest('FETCH_ALL_CONTRACTS', fetchAllContracts);
    yield takeLatest('FETCH_CONTRACT_TO_EDIT', fetchContractToEdit);
    yield takeLatest('UPDATE_CONTRACT', updateContract);
    yield takeLatest('FETCH_RATES', fetchRates);
    yield takeLatest('FETCH_AD_SIZES', fetchAdSizes);
    yield takeLatest('CREATE_NEW_CONTRACT', createNewContract);
    yield takeLatest('UPDATE_RATES', updateRates);
    yield takeLatest('FETCH_AD_SIZE_OBJECT', fetchAdSizeObject);
    yield takeLatest('UPDATE_CONTRACT_FOR_APPROVAL', updateContract)
}

function* fetchAdSizeObject(action) {
    try {
        const response = yield axios.get(`/api/ad-size/${action.payload}`);
        yield put({
            type: 'INSERT_AD_SIZE',
            payload: response.data
        });
    } catch (error) {
        console.error('Failed to fetch ad size object', error);
    }
}

function* updateRates(action) {
    try {
        yield axios.put('/api/rates', action.payload);
    } catch (error) {
        console.error('Failed to update rates', error);
    }
}

function* createNewContract(action) {
    try {
        yield axios.post(`/api/contracts/${action.payload.advertiserId}`, action.payload);
    } catch (error) {
        console.log('Failed to create new contract', error);
    }
}

function* fetchAdSizes() {
    try {
        const response = yield axios.get(`/api/contracts/ad-sizes`);
        yield put({
            type: 'SET_AD_SIZES',
            payload: response.data
        })
    } catch (error) {
        console.error('Failed to fetch ad sizes', error);
    }
}

function* fetchRates() {
    try {
        const response = yield axios.get(`/api/contracts/rates`);
        yield put({
            type: 'SET_RATES',
            payload: response.data
        })
    } catch (error) {
        console.error('Failed to fetch rates', error);
    }
}

function* fetchContractToEdit(action) {
    console.log('params in contracts saga edit are', action.payload);
    try { 
        const response = yield axios.get(`/api/contracts/edit/${action.payload}`);
        yield put({
          type: 'SET_CONTRACT_TO_EDIT',
          payload: response.data
        })
      } catch (error) {
        console.log(`Failed to fetch user to edit at id ${action.payload}:`, error);
      }
}

function* fetchAllContracts() {
    try {
        const response = yield axios.get('/api/contracts/all');

        yield put({ type: 'SET_ALL_CONTRACTS', payload: response.data});
    
    } catch (error) {
        console.log('All contracts GET request failed', error);
    }
}

function* fetchPendingContracts(action) {
    if (action.payload.authLevel === 'advertiser') {
        try {
            const response = yield axios.get('/api/contracts/pending/advertiser', {params: action.payload});
    
            yield put({ type: 'SET_PENDING_CONTRACTS', payload: response.data});
        
        } catch (error) {
            console.log('Pending contracts GET request failed', error);
        }
    } else {
        try {
            const response = yield axios.get('/api/contracts/pending');

            yield put({ type: 'SET_PENDING_CONTRACTS', payload: response.data});
        
        } catch (error) {
            console.log('Pending contracts GET request failed', error);
        }
    }
}

function* fetchActiveContracts(action) {
    if (action.payload.authLevel === 'advertiser') {
        try {
            const response = yield axios.get('/api/contracts/active/advertiser', {params: action.payload});
    
            yield put({ type: 'SET_ACTIVE_CONTRACTS', payload: response.data});
        
        } catch (error) {
            console.log('Active contracts GET request failed', error);
        }
    } else {
        try {
            const response = yield axios.get('/api/contracts/active');

            yield put({ type: 'SET_ACTIVE_CONTRACTS', payload: response.data});
        
        } catch (error) {
            console.log('Active contracts GET request failed', error);
        }
    }
}

function* fetchClosedContracts(action) {
    if (action.payload.authLevel === 'advertiser') {
        try {
            const response = yield axios.get('/api/contracts/closed/advertiser', {params: action.payload});
    
            yield put({ type: 'SET_CLOSED_CONTRACTS', payload: response.data});
        
        } catch (error) {
            console.log('Closed contracts GET request failed', error);
        }
    } else {
        try {
            const response = yield axios.get('/api/contracts/closed');

            yield put({ type: 'SET_CLOSED_CONTRACTS', payload: response.data});
        
        } catch (error) {
            console.log('Closed contracts GET request failed', error);
        }
    }
}

function* updateContract(action) {
    try {
        yield axios.put(`/api/contracts/edit/${action.payload.id}`, action.payload);
    } catch (error) {
        console.error('Error in contract put request', error);
    }
}