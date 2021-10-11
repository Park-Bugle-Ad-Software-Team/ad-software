import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import PendingContractsAdvertiserView from '../Contracts/PendingContractsAdvertiserView';
import ActiveContracts from '../Contracts/ActiveContracts';
import ClosedContracts from '../Contracts/ClosedContracts';

export default function AdvertiserHomePage() {
    const dispatch = useDispatch();

    // global state from redux store
    const store = useSelector((store) => store);
    const user = store.user;
    const pendingContracts = store.pendingContracts;
    const activeContracts = store.activeContracts;
    const closedContracts = store.closedContracts;
    const chat = store.chat;

    return (
        <>
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
                <Grid item xs={12}>
                    <Typography variant="h6">{}</Typography>  
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
                                    <PendingContractsAdvertiserView item={item} />
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
                                    <ActiveContracts item={item} />
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
                                    <ClosedContracts item={item} />
                                </tr>
                            ))}
                        </tbody>
                    </table> 
                </Grid>

            </Grid>
        </>
    );
}

