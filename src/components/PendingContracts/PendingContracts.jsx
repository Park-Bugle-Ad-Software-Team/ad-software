import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

export default function PendingContracts( {item} ) {

    function consoleLogItem() {
        console.log(item.id);
    }

    return (
        <>
            <td>{item.startMonth}</td>
            <td>{item.months}</td>
            <td>{item.contractType}</td>
            <td>{item.adType}</td>
            <td>{item.page}</td>
            <td>{item.colorType}</td>
            <td>${item.actualBill}</td>
            <td><Button onClick={consoleLogItem}>View</Button></td>
            <td><Button>Chat</Button></td>
            <td><Button>Approve</Button></td>
        </>
    );
}