import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AdminHomePage from './AdminHomePage';
import AdvertiserHomePage from './AdvertiserHomePage';
import EmployeeHomePage from './EmployeeHomePage';

export default function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'UNSET_CONTRACT_TO_EDIT'});
        dispatch({type: 'FETCH_PENDING_CONTRACTS', payload: user});
        dispatch({type: 'FETCH_ACTIVE_CONTRACTS', payload: user});
        dispatch({type: 'FETCH_CLOSED_CONTRACTS', payload: user});
        dispatch({type: 'FETCH_ALL_CONTRACTS'});
        if (user.authLevel === 'admin') {
            dispatch({type: 'FETCH_ALL_USERS'});
        }
        // dispatch({type: 'FETCH_ADVERTISERS'});
        // dispatch({type: 'FETCH_AD_REPS'});
        // dispatch({type: 'FETCH_DESIGNERS'});
        // dispatch({type: 'FETCH_CONTRACT_TO_EDIT', payload: {contractId: undefined}})
    }, []);

    // global state from redux
    const store = useSelector((store) => store);
    const user = store.user;

    switch(user.authLevel) {
        case 'advertiser':
            return <AdvertiserHomePage/>
        case 'admin':
            return <AdminHomePage/>
        default:
            return <EmployeeHomePage/>;
    }
}