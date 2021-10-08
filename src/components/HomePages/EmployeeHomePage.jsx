import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import PendingContractsEmployeeView from '../Contracts/PendingContractsEmployeeView';
import AllContracts from '../Contracts/AllContracts';

export default function EmployeeHomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_ADVERTISERS'});
    }, []);

    // local state
    let [filterContract, setFilterContract] = useState({
        advertiser: '', startMonth: '', endMonth: '', contractStatus: ''
    });

    // global state from redux
    const store = useSelector((store) => store)
    const user = store.user;
    const advertisers = store.advertisers;
    const pendingContracts = store.pendingContracts;
    const allContracts = store.allContracts;

    // constants for search drop down criteria
    const statuses = ['Active', 'Closed'];

    function fetchFilteredContracts() {
        dispatch({type: 'FETCH_FILTERED_CONTRACTS'});
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h1">Employee Home Page</Typography>  
                </Grid>
                <Grid item xs={8}>
                    User: {user.name}
                </Grid>
                <Grid item xs={4}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => console.log('in Export button')}
                    >
                        Export
                    </Button>
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={() => console.log('in Create New Ad Contract button')}
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
                            value={filterContract.advertiser}
                            onChange={(event) => setFilterContract({...filterContract, advertiser: event.target.value})}
                        >
                            {advertisers.map((advertiser, i) => (
                                <MenuItem key={i} value={advertiser.companyName}>
                                    {advertiser.companyName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="start-month-select-label">Start Month</InputLabel>
                        <Input
                            id="start-month-select"
                            label="Start Month"
                            value={filterContract.startMonth}
                            type="month"
                            onChange={(event) => setFilterContract({...filterContract, startMonth: event.target.value})}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="end-month-select-label">End Month</InputLabel>
                        <Input
                            id="end-month-select"
                            label="End Month"
                            value={filterContract.endMonth}
                            type="month"
                            onChange={(event) => setFilterContract({...filterContract, endMonth: event.target.value})}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="contract-status-select-label">Status</InputLabel>
                        <Select
                            labelId="contract-status-select-label"
                            id="contract-status-select"
                            label="Status"
                            value={filterContract.contractStatus}
                            onChange={(event) => setFilterContract({...filterContract, contractStatus: event.target.value})}
                        >
                            {statuses.map((status, i) => (
                                <MenuItem key={i} value={status}>{status}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={fetchFilteredContracts}
                    >
                        Search
                    </Button>
                </Grid>

                {/* Pending Contracts component */}
                <Grid item xs={12}>
                    <center>
                        <Typography variant="h3">Pending Contracts</Typography>  
                    </center>
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
                            {pendingContracts.map((item, i) => (
                                <tr className="uTr" key={i}>
                                    <PendingContractsEmployeeView item={item} />
                                </tr>
                            ))}
                        </tbody>
                    </table> 
                </Grid>

                {/* All Contracts component */}
                <Grid item xs={12}>
                    <center>
                        <Typography variant="h3">All Contracts</Typography>  
                    </center>
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
                            {allContracts.map((item, i) => (
                                <tr className="uTr" key={i}>
                                    <AllContracts item={item} />
                                </tr>
                            ))}
                        </tbody>
                    </table> 
                </Grid>

            </Grid>
        </>
    )
}

