const ratesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RATES':
            return action.payload;
        default:
            return state;
    };
};

export default ratesReducer;