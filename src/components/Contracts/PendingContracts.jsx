import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function PendingContracts( {item} ) {
    const dispatch = useDispatch();

    function consoleLogItem() {
        console.log('in consoleLogItem');
    }

    function openChat() {
        // console.log('in openChat');
        dispatch({type: 'FETCH_CHAT', payload: item.id});
    }

    function advertiserApprove() {
        console.log('in advertiserApprove');
    }

    return (
        <>
            <td className="uTd">{item.startMonth}</td>
            <td className="uTd">{item.AdSize.months}</td>
            <td className="uTd">{item.contractType}</td>
            <td className="uTd">{item.AdSize.adType}</td>
            <td className="uTd">{item.page}</td>
            <td className="uTd">{item.Color.colorType}</td>
            <td className="uTd">${item.actualBill}</td>
            <td className="uTd"><Button onClick={consoleLogItem}>View</Button></td>
            <td className="uTd"><Button onClick={openChat}>Chat</Button></td>
            <td className="uTd"><Button onClick={advertiserApprove}>Approve</Button></td>
        </>
    );
}