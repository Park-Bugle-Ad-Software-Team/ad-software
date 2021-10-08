/*
This component is going to be used for rendering both the user creation and user edit features
*/

import { Button, FormControl, TextField, 
            Select, MenuItem, InputLabel,
                Switch, Grid, Typography, 
                    FormGroup, FormLabel, FormControlLabel, FormHelperText, 
                        Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function InviteUserForm() {
    const dispatch = useDispatch()
    
    const params = useParams();
    const userId = params.id;

    const userToEdit = useSelector(store => store.userToEdit);

    useEffect(() => {
        if (userId === undefined) {
            return;
        }
        dispatch({
            type: 'FETCH_USER_TO_EDIT',
            payload: userId
        });
    }, [userId]);

    function handleChange(event, property) {
        dispatch({ 
            type: 'UPDATE_USER_TO_EDIT', 
            payload: {
                ...userToEdit,
                [property]: event.target.value
            } 
        });
    }

    const flipAch = (event) => {
        console.log('checked', event.target.checked);
        dispatch({ 
            type: 'UPDATE_USER_TO_EDIT', 
            payload: {
                ...userToEdit,
                acceptAchPayment: event.target.checked
            } 
        });
    }

    const flipDoNotDisturb = (event) => {
        console.log('checked', event.target.checked);
        dispatch({ 
            type: 'UPDATE_USER_TO_EDIT', 
            payload: {
                ...userToEdit,
                doNotDisturb: event.target.checked
            } 
        });
    }

    const submitUser = () => {
        if (userToEdit.id === undefined) {
            // submit post new user
            dispatch({
                type: 'CREATE_NEW_USER',
                payload: userToEdit
            });
        } else {
            // put an existing user
            dispatch({
                type: 'UPDATE_USER',
                payload: userToEdit // update once we have a the user passed via a prop
            });
        }
    }
    

    return (
        <>
        <h2>
            {userId === undefined ?
                "Create User" :
                "Edit User"
            }
        </h2>
        <FormControl>
            <TextField 
                id="name-input"
                label="Name" 
                variant="outlined" 
                value={userToEdit.name}
                onChange={(event) => handleChange(event, "name")}
            />
            <TextField 
                id="email-input"
                label="Email" 
                variant="outlined" 
                value={userToEdit.email}
                onChange={(event) => handleChange(event, "email")}
            />
            <FormControl>
                <InputLabel id="authLevel-select-label">Auth Level</InputLabel>

                <Select
                    labelId="authLevel-select-label"
                    id="authLevel-select"
                    defaultValue=''
                    onChange={(event) => handleChange(event, "authLevel")}
                > 
                
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="ad rep">Ad Rep</MenuItem>
                    <MenuItem value="advertiser">Advertiser</MenuItem>
                    <MenuItem value="web designer">Web Designer</MenuItem>
                    <MenuItem value="print ad designer">Print Ad Designer</MenuItem>
                    <MenuItem value="finance">Finance</MenuItem>
                </Select>
            </FormControl>
            {userToEdit.authLevel === "advertiser" &&
                <>
                    <h1>Advertiser Info Field</h1>
                    <Grid container width="800px">
                        <Grid item xs={6}>
                            <Typography variant="p">Accepts Ach Payment</Typography>
                            <Switch
                                checked={userToEdit.acceptAchPayment}
                                onChange={(event) => flipAch(event)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="p">Do Not Disturb</Typography>
                            <Switch 
                                checked={userToEdit.doNotDisturb} 
                                onChange={(event) => flipDoNotDisturb(event)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Contact Preference"
                                variant="filled"
                                value={userToEdit.contactPreference}
                                onChange={(event) => handleChange(event, "contactPreference")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Company Name"
                                variant="filled"
                                value={userToEdit.companyName}
                                onChange={(event) => handleChange(event, "companyName")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Advertiser URL"
                                variant="filled"
                                value={userToEdit.advertiserUrl}
                                onChange={(event) => handleChange(event, "advertiserUrl")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Address"
                                variant="filled"
                                value={userToEdit.address}
                                onChange={(event) => handleChange(event, "address")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Name"
                                variant="filled"
                                value={userToEdit.primaryName}
                                onChange={(event) => handleChange(event, "primaryName")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Name"
                                variant="filled"
                                value={userToEdit.secondaryName}
                                onChange={(event) => handleChange(event, "secondaryName")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Title"
                                variant="filled"
                                value={userToEdit.primaryTitle}
                                onChange={(event) => handleChange(event, "primaryTitle")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Title"
                                variant="filled"
                                value={userToEdit.secondaryTitle}
                                onChange={(event) => handleChange(event, "secondaryTitle")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Email"
                                variant="filled"
                                value={userToEdit.primaryEmail}
                                onChange={(event) => handleChange(event, "primaryEmail")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Email"
                                variant="filled"
                                value={userToEdit.secondaryEmail}
                                onChange={(event) => handleChange(event, "secondaryEmail")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Direct Phone"
                                variant="filled"
                                value={userToEdit.primaryDirectPhone}
                                onChange={(event) => handleChange(event, "primaryDirectPhone")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Direct Phone"
                                variant="filled"
                                value={userToEdit.secondaryDirectPhone}
                                onChange={(event) => handleChange(event, "secondaryDirectPhone")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Mobile Phone"
                                variant="filled"
                                value={userToEdit.primaryMobilePhone}
                                onChange={(event) => handleChange(event, "primaryMobilePhone")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Email"
                                variant="filled"
                                value={userToEdit.secondaryMobilePhone}
                                onChange={(event) => handleChange(event, "secondaryEmail")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Notes"
                                variant="filled"
                                multiline
                                rows={4}
                                value={userToEdit.notes}
                                onChange={(event) => handleChange(event, "notes")}
                            />
                        </Grid>
                    </Grid>
                </>
            }
            {userId === undefined ?
                <Button variant="contained" color="primary" onClick={submitUser}>Submit Invite</Button> :
                <Button variant="contained" color="primary" onClick={submitUser}>Save Changes</Button>
            }
        </FormControl>  
        </>
    )
}