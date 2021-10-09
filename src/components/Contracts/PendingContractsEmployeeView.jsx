import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import formatDate from './formatDate';
import { useHistory } from 'react-router';

export default function PendingContractsEmployeeView( {item} ) {
    const dispatch = useDispatch();
    const history = useHistory();

    const viewContract = (contractId) => {
        console.log('in viewContract');
        history.push(`/contracts/edit/${contractId}`);
    }

    function openChat() {
        // console.log('in openChat');
        dispatch({type: 'FETCH_CHAT', payload: item.id});
    }

    return (
        <>
            <td className="uTd">{formatDate(item.startMonth)}</td>
            <td className="uTd">{item.AdSize.months}</td>
            <td className="uTd">{item.contractType}</td>
            <td className="uTd">{item.AdSize.adType}</td>
            <td className="uTd">{item.page}</td>
            <td className="uTd">{item.Color.colorType}</td>
            <td className="uTd">${item.actualBill}</td>
            <td className="uTd"><Button onClick={() => viewContract(item.id)}>View</Button></td>
            <td className="uTd"><Button onClick={openChat}>Chat</Button></td>
        </>
    );
}