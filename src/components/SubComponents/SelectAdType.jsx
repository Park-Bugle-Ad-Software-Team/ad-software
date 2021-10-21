import { FormLabel, Select, FormControl, MenuItem, Grid, TextField } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function SelectAdType({ handleChange }) {
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const user = store.user;

    return (
        <>
            {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel>Ad Type</FormLabel>
                        <Select
                            value={contractToEdit.contractType || ''}
                            onChange={(event) => handleChange(event, "contractType")}
                        >
                            <MenuItem value="Print">Print</MenuItem>
                            <MenuItem value="Web">Web</MenuItem>
                        </Select>
                    </FormControl>
                    {contractToEdit.contractType === "Print" &&
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Page Number</FormLabel>
                            <TextField
                                variant="outlined"
                                type="number"
                                sx={{width: '70px'}}
                                value={contractToEdit.page || ''}
                                onChange={(event) => handleChange(event, "page")}
                            />
                        </FormControl>
                    }
                </Grid> :
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel>Ad Type</FormLabel>
                        <Select
                            disabled
                            value={contractToEdit.contractType || ''}
                            onChange={(event) => handleChange(event, "contractType")}
                        >
                            <MenuItem value="Print">Print</MenuItem>
                            <MenuItem value="Web">Web</MenuItem>
                        </Select>
                    </FormControl>
                    {contractToEdit.contractType === "Print" &&
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Page Number</FormLabel>
                            <TextField
                                disabled
                                variant="outlined"
                                type="number"
                                sx={{width: '70px'}}
                                value={contractToEdit.page || ''}
                                onChange={(event) => handleChange(event, "page")}
                            />
                        </FormControl>
                    }
                </Grid>
            }
        </>
    )
}