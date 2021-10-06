import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

export default function AdvertiserHomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_PENDING_CONTRACTS'});
    }, []);

    // all of our global state from redux store
    let user = useSelector((store) => store.user);
    let pendingContracts = useSelector((store) => store.pendingContracts);
    console.log('pendingContracts are', pendingContracts);

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

