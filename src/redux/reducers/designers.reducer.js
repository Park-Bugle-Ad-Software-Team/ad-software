const designersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DESIGNERS':
            return action.payload;
        default:
            return state;
    }
};

// advertisers will be on the redux state at:
// state.advertisers
export default designersReducer;