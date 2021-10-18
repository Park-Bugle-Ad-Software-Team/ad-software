let baseState = {
  actualBill: 200.00,
  actualColumns: 2,
  actualInches: 4,
  adRepId: 3,
  adRepName: 'Sonia Becerra',
  adSizeId: 6,
  advertiserId: 2,
  colorId: 1,
  commissionPercentage: 20,
  companyName: '',
  contractType: 'Print',
  designerId: 10,
  designerName: 'Kelly Brooks',
  image: [],
  months: 1,
  notes: '',
  page: 5
};

const contractToEditReducer = (state = baseState, action) => {
    switch (action.type) {
      case 'SET_CONTRACT_TO_EDIT':
        return action.payload;
      case 'UNSET_CONTRACT_TO_EDIT':
        return baseState;
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