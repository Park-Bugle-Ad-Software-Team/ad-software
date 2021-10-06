const pendingContractsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PENDING_CONTRACTS':
            return action.payload;
        default:
            return state;
    }
};

// pendingContracts will be on the redux state at:
// state.pendingContracts
export default pendingContractsReducer;