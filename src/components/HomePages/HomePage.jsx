import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AdminHomePage from './AdminHomePage';
import AdvertiserHomePage from './AdvertiserHomePage';
import EmployeeHomePage from './EmployeeHomePage';

export default function HomePage() {
    const dispatch = useDispatch();

    // we send the user as a payload so that only the contracts
    // for that user are shown to them
    useEffect(() => {
        dispatch({type: 'UNSET_CONTRACT_TO_EDIT'});
        dispatch({type: 'FETCH_PENDING_CONTRACTS', payload: user});
        dispatch({type: 'FETCH_ACTIVE_CONTRACTS', payload: user});
        dispatch({type: 'FETCH_CLOSED_CONTRACTS', payload: user});
        dispatch({type: 'FETCH_ALL_CONTRACTS'});
        if (user.authLevel === 'admin') {
            dispatch({type: 'FETCH_ALL_USERS'});
        }
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