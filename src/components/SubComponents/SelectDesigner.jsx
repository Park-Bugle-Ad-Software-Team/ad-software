import { FormLabel, Select, FormControl, MenuItem, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function SelectDesigner({ handleChange }) {
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const allUsers = store.allUsers;
    const user = store.user;
    const designers = store.designers;

    useEffect(() => {
        dispatch({type: 'FETCH_DESIGNERS'})
    }, [])

    return (
        <>
            <Grid item xs={12}>
                {designers.length > 0 &&
                    <>
                        {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                            <FormControl>
                                <FormLabel>Select Designer</FormLabel>
                                <Select
                                    value={contractToEdit.designerName || ''}
                                    onChange={(event) => handleChange(event, "designerId")}
                                >
                                    {designers.map((designer, i) => (
                                        <MenuItem key={i} value={designer.name}>{designer.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl> :
                            <FormControl>
                                <FormLabel>Select Ad Rep</FormLabel>
                                <Select
                                    value={contractToEdit.designerName || ''}
                                    onChange={(event) => handleChange(event, "designerId")}
                                    disabled
                                >
                                    {adReps.map((adRep, i) => (
                                        <MenuItem key={i} value={designer.name}>{designer.name}</MenuItem>
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