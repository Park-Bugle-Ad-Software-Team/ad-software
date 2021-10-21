// Component is deprecated
import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import formatDate from './formatDate';

export default function AllContracts( {item} ) {
    const dispatch = useDispatch();

    function viewContract() {
        console.log('in viewContract');
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
            <td className="uTd"><Button onClick={viewContract}>View</Button></td>
        </>
    );
}