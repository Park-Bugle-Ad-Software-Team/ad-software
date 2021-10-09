import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AdminHomePage from './AdminHomePage';
import AdvertiserHomePage from './AdvertiserHomePage';
import EmployeeHomePage from './EmployeeHomePage';

export default function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_PENDING_CONTRACTS', payload: user});
        dispatch({type: 'FETCH_ACTIVE_CONTRACTS'});
        dispatch({type: 'FETCH_CLOSED_CONTRACTS'});
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