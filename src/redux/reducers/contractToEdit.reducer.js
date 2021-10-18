// let baseState = {
//   actualBill: 0.00,
//   actualColumns: 0,
//   actualInches: 0,
//   adRepId: 11,
//   adRepName: '',
//   adSizeId: 7,
//   advertiserId: 2,
//   colorId: 1,
//   commissionPercentage: 20,
//   companyName: '',
//   contractType: 'Print',
//   designerId: 10,
//   designerName: '',
//   image: [],
//   months: 1,
//   notes: '',
//   page: 5
// };

const contractToEditReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_CONTRACT_TO_EDIT':
        return action.payload;
      case 'UNSET_CONTRACT_TO_EDIT':
        return {};
      case 'UPDATE_CONTRACT_TO_EDIT':
        return action.payload;
      case 'INSERT_AD_SIZE':
        return {...state, AdSize: action.payload}
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default contractToEditReducer;