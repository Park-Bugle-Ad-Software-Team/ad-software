import React from 'react';
import { useSelector } from 'react-redux';
import { FormControl, FormLabel, Grid, TextField } from '@mui/material';
import './ActualSizes.css';

export default function ActualSizes({ handleChange }) {
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const user = store.user;
    
    return (
        <>
            {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Columns</FormLabel>
                        <TextField
                            variant="outlined"
                            type="number"
                            sx={{width: '70px'}}
                            value={contractToEdit.actualColumns || ''}
                            onChange={(event) => handleChange(event, "actualColumns")}
                        />
                    </FormControl>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Inches</FormLabel>
                        <TextField
                            variant="outlined"
                            type="number"
                            sx={{width: '70px'}}
                            value={contractToEdit.actualInches || ''}
                            onChange={(event) => handleChange(event, "actualInches")}
                        />
                    </FormControl>
                </Grid> :
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Columns</FormLabel>
                        <TextField
                            variant="outlined"
                            disabled
                            type="number"
                            sx={{width: '70px'}}
                            value={contractToEdit.actualColumns || ''}
                            onChange={(event) => handleChange(event, "actualColumns")}
                        />
                    </FormControl>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Inches</FormLabel>
                        <TextField
                            variant="outlined"
                            disabled
                            type="number"
                            sx={{width: '70px'}}
                            value={contractToEdit.actualInches || ''}
                            onChange={(event) => handleChange(event, "actualInches")}
                        />
                    </FormControl>
                </Grid>
            }

        </>
    )
}