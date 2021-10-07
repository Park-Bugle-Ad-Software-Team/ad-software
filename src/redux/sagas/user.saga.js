import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createNewUser(action) {
  try {
    axios.post('/api/user/register', action.payload)
  } catch (error) {
    console.log('User create request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* allUsers() {
  try {
    const response = yield axios.get('/api/user/all');
    yield put({type: 'SET_ALL_USERS', payload: response.data})
  } catch (error) {
    console.log('Failed to fetch all users: ', error);
  }
}

function* fetchUserToEdit(action) {
  try { 
    const response = yield axios.get(`/api/user/edit/${action.payload}`);
    yield put({
      type: 'SET_USER_TO_EDIT',
      payload: response.data
    })
  } catch (error) {
    console.log(`Failed to fetch user to edit at id ${action.payload}:`, error);
  }
}

function* updateUser(action) {
  try {
    console.log('action payload in updateUser Saga', action.payload);
    yield axios.put(`/api/user/edit/${action.payload.id}`, action.payload);
  } catch (error) {
    console.log('Failed to update user', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('CREATE_NEW_USER', createNewUser);
  yield takeLatest('FETCH_ALL_USERS', allUsers);
  yield takeLatest('FETCH_USER_TO_EDIT', fetchUserToEdit);
  yield takeLatest('UPDATE_USER', updateUser);
}

export default userSaga;
