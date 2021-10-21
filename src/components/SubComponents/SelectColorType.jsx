import { FormLabel, Select, FormControl, MenuItem, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function SelectColorType({ handleChange }) {
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const user = store.user;

    return (
        <>
            {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel>Color Type</FormLabel>
                        <Select
                            value={contractToEdit.colorId || ''}
                            onChange={(event) => handleChange(event, "colorId")}
                        >
                            <MenuItem value={1}>Black and White</MenuItem>
                            <MenuItem value={2}>Spot</MenuItem>
                            <MenuItem value={3}>Full Color</MenuItem>
                        </Select>
                    </FormControl>
                </Grid> :
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel>Color Type</FormLabel>
                        <Select
                            disabled
                            value={contractToEdit.colorId || ''}
                            onChange={(event) => handleChange(event, "colorId")}
                        >
                            <MenuItem value={1}>Black and White</MenuItem>
                            <MenuItem value={2}>Spot</MenuItem>
                            <MenuItem value={3}>Full Color</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            }
        </>
    )
}