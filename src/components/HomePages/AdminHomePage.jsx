import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid,
    Container, TableBody, TableHead, TableCell, TableContainer, TableRow, Input
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Contracts from '../Contracts/Contracts';

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
  
    function fetchFilteredContracts() {
        dispatch({type: 'FETCH_FILTERED_CONTRACTS'});
    }

    const goToAdCard = (contractId) => {
        history.push(`/contracts/edit/${contractId}`);
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h2">Admin Home Page</Typography>  
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

