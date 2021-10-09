/*
This component is going to be used for rendering both the user creation and user edit features
*/

import { Button, FormControl, TextField, 
            Select, MenuItem, InputLabel,
                Switch, Grid, Typography, 
                    Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

export default function InviteUserForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const params = useParams();
    const userId = params.id;

    const userToEdit = useSelector(store => store.userToEdit);

    const [open, setOpen] = useState(false);

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
        clearUserFields();
        history.push('/users');
    }

    const clearUserFields = () => {
        dispatch({
            type: 'UNSET_USER_TO_EDIT'
        });
    };

    // auth level select handler
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
    setOpen(true);
    };

    const returnToUsers = () => {
        history.goBack();
    }
    

    return (
        <>
        <Container>
            <Button 
                id="backBtn" 
                variant="contained" 
                color="primary" 
                onClick={returnToUsers}
            >
                Back
            </Button>
            <Grid container width="1000px" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">
                        {userId === undefined ?
                            "Create User" :
                            "Edit User"
                        }
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="p">Name</Typography>
                    <TextField 
                        id="name-input"
                        variant="outlined" 
                        value={userToEdit.name}
                        onChange={(event) => handleChange(event, "name")}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="p">Email</Typography>
                    <TextField 
                        id="email-input" 
                        variant="outlined" 
                        value={userToEdit.email}
                        onChange={(event) => handleChange(event, "email")}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="p">Privilege</Typography>
                    {userToEdit &&
                        <FormControl sx={{ m: 1, minWidth: 200}}>
                            <Select
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={userToEdit.authLevel}
                                onChange={(event) => handleChange(event, "authLevel")}
                            >
                                <MenuItem value={userToEdit.authLevel}>{userToEdit.authLevel}</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="ad rep">Ad Rep</MenuItem>
                                <MenuItem value="advertiser">Advertiser</MenuItem>
                                <MenuItem value="web designer">Web Designer</MenuItem>
                                <MenuItem value="print ad designer">Print Ad Designer</MenuItem>
                                <MenuItem value="finance">Finance</MenuItem>
                            </Select>
                        </FormControl>
                    }
                </Grid>
                <Grid item xs={12}>
                    <h1>Additional Info Field</h1>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Contact Preference"
                        variant="outlined"
                        value={userToEdit.contactPreference}
                        onChange={(event) => handleChange(event, "contactPreference")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Company Name"
                        variant="outlined"
                        value={userToEdit.companyName}
                        onChange={(event) => handleChange(event, "companyName")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Advertiser URL"
                        variant="outlined"
                        value={userToEdit.advertiserUrl}
                        onChange={(event) => handleChange(event, "advertiserUrl")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Address"
                        variant="outlined"
                        value={userToEdit.address}
                        onChange={(event) => handleChange(event, "address")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Primary Name"
                        variant="outlined"
                        value={userToEdit.primaryName}
                        onChange={(event) => handleChange(event, "primaryName")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Secondary Name"
                        variant="outlined"
                        value={userToEdit.secondaryName}
                        onChange={(event) => handleChange(event, "secondaryName")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Primary Title"
                        variant="outlined"
                        value={userToEdit.primaryTitle}
                        onChange={(event) => handleChange(event, "primaryTitle")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Secondary Title"
                        variant="outlined"
                        value={userToEdit.secondaryTitle}
                        onChange={(event) => handleChange(event, "secondaryTitle")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Primary Email"
                        variant="outlined"
                        value={userToEdit.primaryEmail}
                        onChange={(event) => handleChange(event, "primaryEmail")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Secondary Email"
                        variant="outlined"
                        value={userToEdit.secondaryEmail}
                        onChange={(event) => handleChange(event, "secondaryEmail")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Primary Direct Phone"
                        variant="outlined"
                        value={userToEdit.primaryDirectPhone}
                        onChange={(event) => handleChange(event, "primaryDirectPhone")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Secondary Direct Phone"
                        variant="outlined"
                        value={userToEdit.secondaryDirectPhone}
                        onChange={(event) => handleChange(event, "secondaryDirectPhone")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Primary Mobile Phone"
                        variant="outlined"
                        value={userToEdit.primaryMobilePhone}
                        onChange={(event) => handleChange(event, "primaryMobilePhone")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Secondary Mobile Phone"
                        variant="outlined"
                        value={userToEdit.secondaryMobilePhone}
                        onChange={(event) => handleChange(event, "secondaryMobilePhone")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Notes"
                        variant="outlined"
                        multiline
                        fullWidth
                        rows={4}
                        value={userToEdit.notes}
                        onChange={(event) => handleChange(event, "notes")}
                    />
                </Grid>
                <Grid item xs={12}>
                    {userId === 'undefined' ?
                        <Button variant="contained" color="primary" onClick={submitUser}>Submit Invite</Button> :
                        <Button variant="contained" color="primary" onClick={submitUser}>Save Changes</Button>
                    }
                </Grid>
            </Grid>
        </Container> 
        </>
    )
}