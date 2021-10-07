import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

export default function ClosedContracts( {item} ) {

    function consoleLogItem() {
        console.log(item.id);
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
        </>
    );
}