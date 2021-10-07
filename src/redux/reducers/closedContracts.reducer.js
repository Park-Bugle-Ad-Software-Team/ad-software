const closedContractsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CLOSED_CONTRACTS':
            return action.payload;
        default:
            return state;
    }
};

// closedContracts will be on the redux state at:
// state.closedContracts
export default closedContractsReducer;