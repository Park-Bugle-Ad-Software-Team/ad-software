import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Contracts from '../Contracts/Contracts';

export default function AdminHomePage() {
    const dispatch = useDispatch();

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

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h1">Admin Home Page</Typography>  
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
                                <Contracts item={item} />
                            </tr>
                        ))}
                    </tbody>
                </table> 
            </Grid>

            {/* Active Contracts component */} 
            <Grid item xs={12}>
                <center>
                    <Typography variant="h3">Active Contracts</Typography>  
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
                        {activeContracts.map((item, i) => (
                            <tr className="uTr" key={i}>
                                <Contracts item={item} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Grid>

            {/* Closed Contracts component */}
            <Grid item xs={12}>
                <center>
                    <Typography variant="h3">Closed Contracts</Typography>  
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
                        {closedContracts.map((item, i) => (
                            <tr className="uTr" key={i}>
                                <Contracts item={item} />
                            </tr>
                        ))}
                    </tbody>
                </table> 
            </Grid>
        </Grid>
    )
}

