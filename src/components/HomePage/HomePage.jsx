import {useSelector} from 'react-redux';
import AdminHomePage from './AdminHomePage';
import AdvertiserHomePage from './AdvertiserHomePage';
import EmployeeHomePage from './EmployeeHomePage';

export default function HomePage() {

    const user = useSelector((store) => store.users);

    switch(user.authLevel) {
        case 'advertiser':
            return <AdvertiserHomePage/>
        case 'admin':
            return <AdminHomePage/>
        default:
            return <EmployeeHomePage/>;
    }
}