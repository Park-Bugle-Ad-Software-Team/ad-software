const allContractsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_CONTRACTS':
            return action.payload;
        default:
            return state;
    }
};

// allContracts will be on the redux state at:
// state.allContracts
export default allContractsReducer;