import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import allUsers from './allUsers.reducer'
import userToEdit from './userToEditReducer';
import pendingContracts from './pendingContracts.reducer';
import activeContracts from './activeContracts.reducer';
import closedContracts from './closedContracts.reducer';
import allContracts from './allContracts.reducer';
import chat from './chat.reducer';
import advertisers from './advertisers.reducer';
import contractToEdit from './contractToEdit.reducer';
import rates from './rates.reducer';
import adSize from './adSize.reducer';
import ratesToEdit from './ratesToEdit.reducer';
import contractChatId from './contractChatId.reducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  allUsers, // has the list of users requested by an admin
  userToEdit, // is the single user we are editing at any given time
  pendingContracts, // contrains a list of contracts that are not approved
  activeContracts, // contrains a list of active contracts
  closedContracts, // contrains a list of closed contracts
  allContracts, // contains a list of all contracts
  chat, // contains all the chat for the specified contract
  advertisers, // contains a list of all the companyNames taken from the user table
  contractToEdit, // contains data for current ad card on screen
  rates, // storing all rate schemas from our db
  adSize,
  ratesToEdit,
  contractChatId, // id of the contract that someone wants to chat about
});

export default rootReducer;
