import { FormLabel, Select, FormControl, MenuItem, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function ContractNotes({ handleChange }) {
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
                        <FormLabel>Notes</FormLabel>
                        <TextField
                            multiline
                            rows={6}
                            variant="outlined"
                            sx={{width: 300}}
                            value={contractToEdit.notes || ''}
                            onChange={(event) => handleChange(event, "notes")}
                        />
                    </FormControl>
                </Grid> :
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel>Notes</FormLabel>
                        <TextField
                            multiline
                            disabled
                            rows={6}
                            variant="outlined"
                            sx={{width: 300}}
                            value={contractToEdit.notes || ''}
                            onChange={(event) => handleChange(event, "notes")}
                        />
                    </FormControl>
                </Grid>
            }
        </>
    )
}