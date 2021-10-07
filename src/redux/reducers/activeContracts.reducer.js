const activeContractsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACTIVE_CONTRACTS':
            return action.payload;
        default:
            return state;
    }
};

// activeContracts will be on the redux state at:
// state.activeContracts
export default activeContractsReducer;