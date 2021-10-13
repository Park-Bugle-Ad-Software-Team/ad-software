const ratesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RATES_TO_EDIT':
            return action.payload;
        default:
            return state;
    };
};

export default ratesReducer;