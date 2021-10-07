const userToEditReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_TO_EDIT':
        return action.payload;
      case 'UNSET_USER_TO_EDIT':
        return {};
      case 'UPDATE_USER_TO_EDIT':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default userToEditReducer;