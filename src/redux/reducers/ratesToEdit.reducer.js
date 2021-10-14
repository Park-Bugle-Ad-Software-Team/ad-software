const ratesToEditReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RATES_TO_EDIT':
            return action.payload;
        case 'UPDATE_RATES_TO_EDIT':
            return action.payload;
        case 'UNSET_RATES_TO_EDIT':
            return [];
        default:
            return state;
    };
};

export default ratesToEditReducer;