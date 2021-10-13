import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid,
    Container, TableBody, TableHead, TableCell, TableContainer, TableRow, Input
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DataTable from '../DataTable/DataTable';

export default function AdminHomePage() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({type: 'FETCH_ADVERTISERS'});
    }, []);

    // local state
    let [filteredContract, setFilteredContract] = useState({ advertiser: '', month: '' });

    // global state from redux store
    const store = useSelector((store) => store);
    const user = store.user;
    const advertisers = store.advertisers;
    const pendingContracts = store.pendingContracts;
    const activeContracts = store.activeContracts;
    const closedContracts = store.closedContracts;

    function fetchFilteredContracts() {
        dispatch({type: 'FETCH_FILTERED_CONTRACTS'});
    }

    const goToAdCard = (contractId) => {
        history.push(`/contracts/edit/${contractId}`);
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <center>
                    <Typography variant="h2">Admin Home Page</Typography>
                </center>  
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h4">User: {user.name}</Typography>
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
                    onClick={() => goToAdCard()}
                >
                    Create New Ad Contract
                </Button>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <InputLabel id="advertiser-select-label">Advertiser</InputLabel>
                    <Select
                        labelId="advertiser-select-label"
                        id="advertiser-select"
                        label="Advertiser"
                        value={filteredContract.advertiser}
                        onChange={(event) => setFilteredContract({...filteredContract, advertiser: event.target.value})}
                    >
                        {advertisers.map((advertiser, i) => (
                            <MenuItem key={i} value={advertiser.companyName}>
                                {advertiser.companyName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="month-select-label">Month</InputLabel>
                    <Input
                        id="month-select"
                        label="Month"
                        value={filteredContract.month}
                        type="month"
                        onChange={(event) => setFilteredContract({...filteredContract, month: event.target.value})}
                    />
                </FormControl>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={fetchFilteredContracts}
                >
                    Search
                </Button>
            </Grid>

            {/* Pending Contracts */}
            <Grid item xs={12}>
                <div className="contractHeader">
                    <Typography variant="h3">Pending Contracts</Typography> 
                </div> 
            </Grid>
            <Grid item xs={12}>
                <DataTable tableData={pendingContracts}/>
            </Grid>

            {/* Active Contracts */}
            <Grid item xs={12}>
                <div className="contractHeader">
                    <Typography variant="h3">Active Contracts</Typography> 
                </div> 
            </Grid>
            <Grid item xs={12}>
                <DataTable tableData={activeContracts}/>
            </Grid>

            {/* Closed Contracts */}
            <Grid item xs={12}>
                <div className="contractHeader">
                    <Typography variant="h3">Closed Contracts</Typography> 
                </div>  
            </Grid>
            <Grid item xs={12}>
                <DataTable tableData={closedContracts}/>
            </Grid>

        </Grid>
    );
}

