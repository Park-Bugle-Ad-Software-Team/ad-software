const chatReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHAT':
            return action.payload;
        default:
            return state;
    }
};

// chat will be on the redux state at:
// state.chat
export default chatReducer;