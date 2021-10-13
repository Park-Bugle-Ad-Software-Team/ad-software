import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import React from 'react';
import DataTable from '../DataTable/DataTable';

export default function AdvertiserHomePage() {

    // global state from redux
    const store = useSelector((store) => store);
    const user = store.user;
    const pendingContracts = store.pendingContracts;
    const activeContracts = store.activeContracts;
    const closedContracts = store.closedContracts;

    return (
        <Grid container>
            
            <Grid item xs={12}>
                <Typography variant="h1">Advertiser Home Page</Typography>  
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h2">Welcome, {user.name}!</Typography>  
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h2">{user.companyName}</Typography>  
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

