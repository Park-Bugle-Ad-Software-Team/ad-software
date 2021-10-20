const adRepsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_AD_REPS':
            return action.payload;
        default:
            return state;
    }
};

// advertisers will be on the redux state at:
// state.advertisers
export default adRepsReducer;