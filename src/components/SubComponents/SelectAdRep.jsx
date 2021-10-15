import { FormLabel, Select, FormControl, MenuItem, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function SelectAdRep({ handleChange }) {
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const allUsers = store.allUsers;
    const user = store.user;
    const adReps = store.adReps;

    useEffect(() => {
        dispatch({type: 'FETCH_AD_REPS'})
    }, [])

    return (
        <>
            <Grid item xs={12}>
                {adReps.length > 0 &&
                    <>
                        {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                            <FormControl>
                                <FormLabel>Select Ad Rep</FormLabel>
                                <Select
                                    value={contractToEdit.adRepName || ''}
                                    onChange={(event) => handleChange(event, "adRepId")}
                                >
                                    {adReps.map((adRep, i) => (
                                        <MenuItem key={i} value={adRep.name}>{adRep.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl> :
                            <FormControl>
                                <FormLabel>Select Ad Rep</FormLabel>
                                <Select
                                    value={contractToEdit.adRepName || ''}
                                    onChange={(event) => handleChange(event, "adRepId")}
                                    disabled
                                >
                                    {adReps.map((adRep, i) => (
                                        <MenuItem key={i} value={adRep.name}>{adRep.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }
                    </>
                }
            </Grid>
        </>
    )
}