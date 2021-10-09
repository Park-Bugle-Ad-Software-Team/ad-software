import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid,
    Container, TableBody, TableHead, TableCell, TableContainer, TableRow
} from '@mui/material';

import { useSelector } from 'react-redux';

import PendingContracts from '../Contracts/PendingContractsEmployeeView';
import ActiveContracts from '../Contracts/ActiveContracts';

export default function AdminHomePage() {
    // test data 
    let admin = {
        firstName: 'Josh',
        lastName: 'Becerra'
    };

    let advertisers = [
        {
            name: 'Chroma Zone'
        },
        {
            name: 'Ace Hardware'
        },
        {
            name: 'Park Bugle'
        }
    ];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let years = [2020, 2021, 2022, 2023];

    const store = useSelector(store => store);
    const activeContracts = store.activeContracts;
    const pendingContracts = store.pendingContracts;

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h2">Admin Home Page</Typography>  
                </Grid>
                <Grid item xs={8}>
                    
                    <Typography variant="h4">User: {admin.firstName} {admin.lastName}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        // onClick
                    >
                        Export
                    </Button>
                    <Button 
                        variant="contained"
                        color="primary"
                        // onClick
                    >
                        Create New Ad Contract
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 1, minWidth: 200}}>
                        <InputLabel id="advertiser-select-label">Advertiser</InputLabel>
                        <Select
                            labelId="advertiser-select-label"
                            id="advertiser-select"
                            label="Advertiser"
                            defaultValue=''
                            // onChange
                        >
                            {advertisers.map((advertiser, i) => (
                                <MenuItem key={i} value={advertiser.name}>{advertiser.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 200}}>
                        <InputLabel id="month-select-label">Month</InputLabel>
                        <Select
                            labelId="month-select-label"
                            id="month-select"
                            label="Month"
                            defaultValue=''
                            // onChange
                        >
                            {months.map((month, i) => (
                                <MenuItem key={i} value={month}>{month}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 200}}>
                        <InputLabel id="year-select-label">Year</InputLabel>
                        <Select
                            labelId="year-select-label"
                            id="year-select"
                            label="Year"
                            defaultValue=''
                            // onChange
                        >
                            {years.map((year, i) => (
                                <MenuItem key={i} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Pending Contracts</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <table className="uTable">
                            <thead>
                                <tr className="uTr">
                                    <th className="uTh">Start Month</th>
                                    <th className="uTh">Contract Length</th>
                                    <th className="uTh">Type</th>
                                    <th className="uTh">Size</th>
                                    <th className="uTh">Page</th>
                                    <th className="uTh">Color</th>
                                    <th className="uTh">Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingContracts.map((item) => (
                                    <tr className="uTr" key={item.id}>
                                        <PendingContracts item={item} />
                                    </tr>
                                ))}
                            </tbody>
                        </table> 
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">Active Contracts</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <table className="uTable">
                            <thead>
                                <tr className="uTr">
                                    <th className="uTh">Start Month</th>
                                    <th className="uTh">Contract Length</th>
                                    <th className="uTh">Type</th>
                                    <th className="uTh">Size</th>
                                    <th className="uTh">Page</th>
                                    <th className="uTh">Color</th>
                                    <th className="uTh">Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeContracts.map((item) => (
                                    <tr className="uTr" key={item.id}>
                                        <ActiveContracts item={item} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Grid>
                </Grid>
            </Container>
            </Grid>
        </>
    )
}

