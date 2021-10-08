import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

export default function EmployeeHomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_ADVERTISERS'});
    }, []);

    // local state
    let [searchAdvertiser, setSearchAdvertiser] = useState('');
    let [searchStartMonth, setSearchStartMonth] = useState('');
    let [searchEndMonth, setSearchEndMonth] = useState('');
    let [searchContractStatus, setSearchContractStatus] = useState('');

    // global state from redux
    const store = useSelector((store) => store)
    const user = store.user;
    const advertisers = store.advertisers;

    // constants for search drop down criteria
    const statuses = ['Active', 'Closed'];

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
                    <Typography variant="h6">{JSON.stringify(searchStartMonth)}</Typography>  
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <InputLabel id="advertiser-select-label">Advertiser</InputLabel>
                        <Select
                            labelId="advertiser-select-label"
                            id="advertiser-select"
                            label="Advertiser"
                            value={searchAdvertiser}
                            onChange={(event) => setSearchAdvertiser(event.target.value)}
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
                            labelId="start-month-select-label"
                            id="start-month-select"
                            label="Start Month"
                            value={searchStartMonth}
                            type="month"
                            onChange={(event) => setSearchStartMonth(event.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="end-month-select-label">End Month</InputLabel>
                        <Input
                            labelId="end-month-select-label"
                            id="end-month-select"
                            label="End Month"
                            value={searchEndMonth}
                            type="month"
                            onChange={(event) => setSearchEndMonth(event.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="contract-status-select-label">Status</InputLabel>
                        <Select
                            labelId="contract-status-select-label"
                            id="contract-status-select"
                            label="Status"
                            value={searchContractStatus}
                            onChange={(event) => setSearchContractStatus(event.target.value)}
                        >
                            {statuses.map((status, i) => (
                                <MenuItem key={i} value={status}>{status}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => console.log('in Search button')}
                    >
                        Search
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {/* component for listing out pending contracts */}
                </Grid>
                <Grid item xs={12}>
                    {/* component for listing out approved contracts */}
                </Grid>
            </Grid>
        </>
    )
}

