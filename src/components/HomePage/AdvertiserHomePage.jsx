import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import PendingContracts from '../PendingContracts/PendingContracts';

export default function AdvertiserHomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_PENDING_CONTRACTS'});
    }, []);

    // all of our global state from redux store
    let user = useSelector((store) => store.user);
    let pendingContracts = useSelector((store) => store.pendingContracts);
    console.log('pending contracts are', pendingContracts);

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h1">Advertiser Home Page</Typography>  
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2">{user.name}</Typography>  
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3">Pending Contracts</Typography>  
                </Grid>
                <Grid item xs={12}>
                    <table>
                        <thead>
                            <tr>
                                <th>Start Month</th>
                                <th>Contract Length</th>
                                <th>Type</th>
                                <th>Size</th>
                                <th>Page</th>
                                <th>Color</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingContracts.map((item, i) => (
                                <tr key={i}>
                                    <PendingContracts item={item} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pending Contracts component */} 
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3">Active Contracts</Typography>  
                </Grid>
                <Grid item xs={12}>
                    {/* Active Contracts component */} 
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3">Closed Contracts</Typography>  
                </Grid>
                <Grid item xs={12}>
                    {/* Closed Contracts component */} 
                </Grid>
            </Grid>
        </>
    )
}

