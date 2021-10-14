const contractChatId = (state = '', action) => {
    switch (action.type) {
        case 'SET_CONTRACT_CHAT_ID':
            return action.payload;
        default:
            return state;
    }
};

// contractChatId will be on the redux state at:
// state.contractChatId
export default contractChatId;