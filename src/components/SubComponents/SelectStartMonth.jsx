import { FormLabel, Select, FormControl, MenuItem, Grid, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function SelectStartMonth({ handleChange }) {
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const allUsers = store.allUsers;
    const user = store.user;
    const adReps = store.adReps;

    let startDate = new Date(contractToEdit.startMonth);
    let yyyy = startDate.getFullYear();
    let mm = String(startDate.getUTCMonth() + 1).padStart(2, '0');

    return (
        <>
            {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel id="startMonthLabel">Start Month:</FormLabel>
                        <Input
                            label="Start Month"
                            labelId="startMonthLabel"
                            type="month"
                            min="2021-09"
                            value={(yyyy + '-' + mm)}
                            onChange={(event) => handleChange(event, "startMonth")}
                        />
                    </FormControl>
                </Grid> :
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel id="startMonthLabel">Start Month:</FormLabel>
                        <Input
                            label="Start Month"
                            labelId="startMonthLabel"
                            type="month"
                            disabled
                            min="2021-01"
                            value={(yyyy + '-' + mm)}
                            onChange={(event) => handleChange(event, "startMonth")}
                        />
                    </FormControl>
                </Grid>
        }
        </>
    )
}