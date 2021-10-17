import { FormLabel, Select, FormControl, MenuItem, Grid, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function SelectContractLength({ handleChange }) {
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const allUsers = store.allUsers;
    const user = store.user;
    const adReps = store.adReps;

    return (
        <>
            {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel>Contract Length</FormLabel>
                        <Select
                            value={contractToEdit.months || ''}
                            onChange={(event) => handleChange(event, "months")}
                        >
                            <MenuItem value={1}>1 Month</MenuItem>
                            <MenuItem value={2}>2 Months</MenuItem>
                            <MenuItem value={4}>4 Months</MenuItem>
                            <MenuItem value={12}>12 Months</MenuItem>
                        </Select>
                    </FormControl>
                </Grid> :
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel>Contract Length</FormLabel>
                        <Select
                            value={contractToEdit.months || ''}
                            onChange={(event) => handleChange(event, "months")}
                            disabled
                        >
                            <MenuItem value={1}>1 Month</MenuItem>
                            <MenuItem value={2}>2 Months</MenuItem>
                            <MenuItem value={4}>4 Months</MenuItem>
                            <MenuItem value={12}>12 Months</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            }
        </>
    )
}