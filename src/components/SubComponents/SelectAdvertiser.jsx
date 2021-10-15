import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Select, MenuItem, FormLabel, FormControl } from '@mui/material';

export default function SelectAdvertiser({ contractId, handleChange }) {
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const advertisers = store.advertisers;
    
    return (
        <>
            {contractId !== 'undefined' ?
                <Grid item xs={12}>
                    <Typography variant="h4">{contractToEdit.companyName}</Typography>
                </Grid> :
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel>Select Advertiser</FormLabel>
                        <Select
                            value={contractToEdit.companyName || ''}
                            onChange={(event) => handleChange(event, "userId")}
                        >
                            {/* map through advertisers */}
                            {advertisers.map((advertiser,i) => (
                                <MenuItem key={i} value={advertiser.id}>{advertiser.companyName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            }
        </>
    )
}