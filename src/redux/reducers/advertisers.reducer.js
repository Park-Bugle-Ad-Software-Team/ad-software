const advertisersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADVERTISERS':
            return action.payload;
        default:
            return state;
    }
};

// advertisers will be on the redux state at:
// state.advertisers
export default advertisersReducer;