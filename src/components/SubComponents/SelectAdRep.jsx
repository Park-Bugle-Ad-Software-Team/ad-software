import { FormLabel, Select, FormControl, MenuItem, Grid } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function SelectAdRep({ handleChange }) {
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const user = store.user;
    const adReps = store.adReps;

    return (
        <>
            <Grid item xs={12}>
                {adReps &&
                <>
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
                </>
                }
            </Grid>
        </>
    )
}