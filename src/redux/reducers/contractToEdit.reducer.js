const contractToEditReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_CONTRACT_TO_EDIT':
        return action.payload;
      case 'UNSET_CONTRACT_TO_EDIT':
        return {};
      case 'UPDATE_CONTRACT_TO_EDIT':
        return action.payload;
      case 'INSERT_AD_SIZE':
        return {...state, AdSize: action.payload}
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default contractToEditReducer;