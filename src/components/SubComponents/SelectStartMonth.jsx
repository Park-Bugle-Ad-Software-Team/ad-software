import { FormLabel, FormControl, Grid, Input } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function SelectStartMonth({ handleChange }) {
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const user = store.user;

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