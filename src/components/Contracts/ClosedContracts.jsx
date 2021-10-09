import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import formatDate from './formatDate';

export default function ClosedContracts( {item} ) {

    function consoleLogItem() {
        console.log(item.id);
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
            <td className="uTd"><Button onClick={consoleLogItem}>View</Button></td>
        </>
    );
}