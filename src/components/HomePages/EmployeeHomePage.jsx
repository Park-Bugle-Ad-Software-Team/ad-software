import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid,
    Container, TableBody, TableHead, TableCell, TableContainer, TableRow, Input
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DataTable from '../DataTable/DataTable';
import DataTableExport from '../DataTable/DataTableExport';

export default function EmployeeHomePage() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({type: 'FETCH_ADVERTISERS'});
    }, []);

    // local state
    let [showingExportView, setShowingExportView] = useState(false);

    // global state from redux store
    const store = useSelector((store) => store);
    const user = store.user;
    const pendingContracts = store.pendingContracts;
    const activeContracts = store.activeContracts;
    const closedContracts = store.closedContracts;
    const allContracts = store.allContracts;

    const goToAdCard = (contractId) => {
        history.push(`/contracts/edit/${contractId}`);
    }

    return (
        <Grid container>
            <Grid align="center" item xs={12}>
                <Typography variant="h2">Welcome, {user.name}!</Typography>
            </Grid>
            <Grid align="left" item xs={4}></Grid>
            <Grid align="center" item xs={4}>
                <Typography variant="h6">Role: {user.authLevel}</Typography>
            </Grid>
            <Grid item xs={8}></Grid>
            <Grid align="center" item xs={4}>
                <button className="btn"
                    onClick={
                        showingExportView === true ?
                        () => setShowingExportView(false) :
                        () => setShowingExportView(true)
                    }
                >
                    {showingExportView === true ?
                        `Contracts View` :
                        `Export View`
                    }
                </button>
                {user.authLevel === 'ad rep' ? 
                    <button className="btn" onClick={() => goToAdCard()}>
                        Create Contract
                    </button>
                    :
                    null
                }
            </Grid>
            
            {showingExportView === false ?
                <>
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
                </>
                :
                <>
                    {/* All Contracts */}
                    <Grid item xs={12}>
                        <div className="contractHeader">
                            <Typography variant="h3">Current Month's Contracts</Typography> 
                        </div> 
                    </Grid>
                    <Grid item xs={12}>
                        <DataTableExport tableData={allContracts}/>
                    </Grid>
                </>
            }

        </Grid>
    );
}

