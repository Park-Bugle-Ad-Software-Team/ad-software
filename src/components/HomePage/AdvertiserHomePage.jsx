import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import PendingContracts from '../Contracts/PendingContracts';
import ActiveContracts from '../Contracts/ActiveContracts';
import ClosedContracts from '../Contracts/ClosedContracts';

export default function AdvertiserHomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_PENDING_CONTRACTS'});
        dispatch({type: 'FETCH_ACTIVE_CONTRACTS'});
        dispatch({type: 'FETCH_CLOSED_CONTRACTS'});
    }, []);

    // all of our global state from redux store
    //
    let user = useSelector((store) => store.user);
    let pendingContracts = useSelector((store) => store.pendingContracts);
    // console.log('pending contracts are', pendingContracts);
    let activeContracts = useSelector((store) => store.activeContracts);
    // console.log('active contracts are', activeContracts);
    let closedContracts = useSelector((store) => store.closedContracts);
    // console.log('closed contracts are', closedContracts);
    let chat = useSelector((store) => store.chat);
    console.log('chat is', chat);

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
                                    <PendingContracts item={item} />
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

