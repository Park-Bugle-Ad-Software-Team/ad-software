const adSizeReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_AD_SIZES':
            return action.payload;
        default:
            return state;
    };
};

export default adSizeReducer;